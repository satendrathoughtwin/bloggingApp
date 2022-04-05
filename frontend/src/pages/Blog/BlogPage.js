import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import RichEditor from "../../components/Editor/RichEditor";
import { createPost, getPostById, updatePostById } from "../../services/api";
import { storage } from "../../services/firebase";

import swal from "sweetalert";
import "./BlogPage.css";
import { useNavigate, useParams } from "react-router-dom";
const BlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [token, setToken] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const { blogId } = useParams();
  const navigate = useNavigate();

  const updateBlog = async (postId) => {
    const locatStorageData = await localStorage.getItem("loginUserData");
    const localStorageObjectData = await JSON.parse(locatStorageData);
    const body = {
      title,
      description,
      imgUrl,
      userEmail: localStorageObjectData.email,
    };
    const result = await updatePostById(postId, body);
    if (result) {
      swal({
        title: "Post has updated!",
        text: "Go On Your Profile",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          navigate("/userProfile");
        }
      });
    }
  };

  const savePost = async (e) => {
    e.preventDefault();
    if (blogId) {
      updateBlog(blogId);
    } else {
      if (imgUrl) {
        const locatStorageData = await localStorage.getItem("loginUserData");
        const localStorageObjectData = await JSON.parse(locatStorageData);
        const body = {
          title,
          description,
          imgUrl,
          userEmail: localStorageObjectData.email,
        };
        const data = await createPost(body);
        if (data) {
          swal("Good job!", "blog has created!", "success");
          navigate("/userProfile");
        }
      } else {
        swal("Good job!", "upload image first!", "success");
      }
    }
  };

  const getBlogById = async () => {
    const result = await getPostById(blogId);
    if (result) {
      result.map((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setImgUrl(data.imgUrl);
      });
    }
  };

  const findToken = async () => {
    const locatStorageData = await localStorage.getItem("loginUserToken");
    const localStorageObjectToken = await JSON.parse(locatStorageData);
    setToken(localStorageObjectToken);
  };

  useEffect(() => {
    getBlogById();
  }, []);
  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
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

  useEffect(() => {
    getBlogById();
    findToken();
  }, []);

  return (
    <section className=" blogPage">
      {token ? (
        <>
          <header>{blogId ? "Update Blog" : "Create Blog"}</header>
          <form onSubmit={formHandler}>
            {imgUrl ? <img src={imgUrl} alt="" /> : ""}
            <div className="blogPageImageDiv">
              <input type="file" />

              <button type="submit">
                {buttonClick ? `Uploading ${progress} %` : "Upload *"}
              </button>
            </div>
          </form>

          <form onSubmit={savePost}>
            <div className="blogPageInputDiv ">
              <label>Title</label> <br></br>
              <input
                type="text"
                placeholder="Type Title Here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="descriptionDiv">
              <label>Description</label>
              <RichEditor
                setDescription={setDescription}
                description={description}
              />
            </div>

            <div className="BlogPagebuttonDiv">
              <button type="submit">Post</button>
              <button type="cancel">Cancel</button>
            </div>
          </form>
        </>
      ) : (
        <div className="blogPage_NotLoggedInDiv">
          <header>Not LoggedIn ! login first</header>
          <button  onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
