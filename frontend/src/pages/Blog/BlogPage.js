import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import RichEditor from "../../components/Editor/RichEditor";
import { createPost, getPostById, updatePostById } from "../../services/api";
import { storage } from "../../services/firebase";

import swal from "sweetalert";
import "./BlogPage.css";
import { useParams } from "react-router-dom";
const BlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const { blogId } = useParams();

  const updateBlog = async (postId) => {
    const body = { title, description, imgUrl };
    const result = await updatePostById(postId, body);
    if (result) {
      swal("Good job!", "Post has updated!", "success");
    }
  };

  const savePost = async (e) => {
    e.preventDefault();
    if (blogId) {
      updateBlog(blogId);
    } else {
      if (imgUrl) {
        const body = { title, description, imgUrl };
        const data = await createPost(body);
        if (data) {
          alert("blog has uploaded");
        }
      } else {
        alert("upload image first");
      }
    }
  };

  const getBlogById = async () => {
    const result = await getPostById(blogId);
    if (result) {
    result.map(data=>{
      setTitle(data.title)
      setDescription(data.description)
      setImgUrl(data.imgUrl)
    })
    }
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

  useEffect(()=>{
    getBlogById()
  },[])

  return (
    <section className=" blogPage">
      <header>{blogId ? "Update Blog" : "Crete Blog"}</header>
      <form onSubmit={formHandler}>
      {imgUrl ? <img src={imgUrl} alt=""/> :""}
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
    </section>
  );
};

export default BlogPage;
