import axios from "axios";
const createPost = async (body) => {
  console.log("datattttta ----------->body")
  try {
    const result = await axios.post(`http://localhost:8000/api/blog`, body);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog creation is failed", err.message);
  }
};

const getPostById = async (postId) => {

  console.log("Post id is comming", postId)
  try {
    const result = await axios.get(`http://localhost:8000/api/blog/${postId}`);
    if (result) {
      console.log("get post data by Id ---->", result.data.data);
      return result.data.data;
    }
  } catch (err) {
    console.log("blog find is failed", err.message);
  }
};

const getAllPosts = async () => {
  try {
    const result = await axios.get(`http://localhost:8000/api/blog`);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog find is failed", err.message);
  }
};

const updatePostById = async (postId, body) => {
  try {
    const result = await axios.patch(
      `http://localhost:8000/api/blog/${postId}`, body
    );
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog/post updation is failed", err.message);
  }
};
const deletePostById = async (postId) => {
  try {
    const result = await axios.delete(
      `http://localhost:8000/api/blog/${postId}`
    );
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog/post deletion is failed", err.message);
  }
};
export { createPost, getPostById, getAllPosts, updatePostById, deletePostById };
