import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  createPost,
  getPostById,
  getUserById,
  updatePostById,
  updateUserById,
} from "../../services/api";
import { storage } from "../../services/firebase";

import swal from "sweetalert";
import "./UpdateUser.css";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");

  const [userData, setUserData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const { userId } = useParams();

  const updateUserProfile = async (e) => {
    e.preventDefault();
    const body = {
      name ,
      profession,
      imgUrl,
      userEmail: email,
    };
    const result = await updateUserById(userId, body);
    if (result) {
      swal("Good job!", "User has updated!", "success");
    }
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/users/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImgUrl(url);
        });
      }
    );
  };

  const formHandler = (e) => {
    e.preventDefault();
    setButtonClick(true);
    const file = e.target[0].files[0];
    console.log(file);
    uploadFile(file);
  };

  const getUserProfile = async () => {
    const result = await getUserById(userId);
    if (result) {
      await setUserData(result[0]);
      await setEmail(result[0].email);
      await setName(result[0].name);
      await setProfession(result[0].profession);
      await setImgUrl(result[0].imgUrl);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <section className=" blogPage">
      <header>Update Profile</header>
      <form onSubmit={formHandler}>
        {imgUrl ? <img src={imgUrl} alt="" /> : ""}
        <div className="blogPageImageDiv">
          <input type="file" />
          <button type="submit">
            {buttonClick ? `Uploading ${progress} %` : "Upload *"}
          </button>
        </div>
      </form>

      <form onSubmit={updateUserProfile}>
        <div className="blogPageInputDiv ">
          <label>Email</label> <br></br>
          <input type="text" value={userData.email} readOnly />
        </div>
        <div className="blogPageInputDiv ">
          <label>Name</label> <br></br>
          <input
            type="text"
            placeholder="Type Title Here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="blogPageInputDiv ">
          <label>Profession</label> <br></br>
          <input
            type="text"
            placeholder="Type Title Here..."
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        <div className="BlogPagebuttonDiv">
          <button type="submit">Post</button>
          <button type="cancel">Cancel</button>
        </div>
      </form>
    </section>
  );
};

export default UpdateUser;
