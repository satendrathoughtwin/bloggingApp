import axios from "axios";
const createPost = async (body) => {
  try {
    const result = await axios.post(`/api/blog`, body);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog creation is failed", err.message);
  }
};

const getPostById = async (postId) => {
  try {
    const result = await axios.get(`/api/blog/${postId}`);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog find is failed", err.message);
  }
};

const getAllPosts = async () => {
  try {
    const result = await axios.get(`/api/blog`);
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
      `/api/blog/${postId}`,
      body
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
      `/api/blog/${postId}`
    );
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("blog/post deletion is failed", err.message);
  }
};

const register = async (body) => {
  try {
    const result = await axios.post(`/api/user/userRegister`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(`user Register Error : `, err.message);
  }
};

const login = async (body) => {
  try {
    const result = await axios.post(`/api/user/userLogin`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(`user Login Error : `, err.message);
  }
};

const getAllpostsOfIndivisualUser = async (userEmail) => {
  try {
    const result = await axios.get(`/api/userblog/${userEmail}`);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log(`get All Posts of indivisual user: `, err.message);
  }
};

const updateUserById = async (userId, body) => {
  try {
    const result = await axios.patch(`/api/user/userUpdate/${userId}`, body);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("user updation is failed", err.message);
  }
};

const getUserById = async (userId) => {
  try {
    const result = await axios.get(`/api/user/userfind/${userId}`);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("user find is failed", err.message);
  }
};
const getUserByEmail = async (userEmail) => {
  try {
    const result = await axios.get(`/api/user/userfindByEmail/${userEmail}`);
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("user find is failed", err.message);
  }
};

const email_Number_Varification = async (body) => {
  let payload = { emailNumberVarification: "", type: "" };
  const { email, number } = body;
  if (email) {
    payload.emailNumberVarification = email;
    payload.type = "just for logic";
  } else {
    payload.emailNumberVarification = number;
    payload.type = 1234567890;
  }
  try {
    const result = await axios.patch(
      `/api/user/email_Number_Varification`,
      payload
    );
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const OTPVarification = async (body) => {
  try {
    const result = await axios.patch(
      `/api/user/verify_Verification_Code`,
      body
    );
    if (result) {
      return result.data.status;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const changePassword = async (body) => {
  try {
    const result = await axios.patch(`/api/user/forgetPassword`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const follow = async (body) => {
  try {
    const result = await axios.patch(`/api/user/follow`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("follow Failed", err.message);
  }
};

const alreadyFollowing = async (body) => {
  try {
    const result = await axios.patch(
      `/api/user/isInMyFollowingAndFollowerList`,
      body
    );
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("follow Failed", err.message);
  }
};

const unFollow = async (body) => {
  try {
    const result = await axios.patch(`/api/user/unFollow`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("follow Failed", err.message);
  }
};

const like = async (body) => {
  try {
    const result = await axios.patch(`/api/blogLike`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("Like Failed", err.message);
  }
};

const alreadyLiked = async (body) => {
  try {
    const result = await axios.patch(`/api/blogLikeIsExist`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("follow Failed", err.message);
  }
};

const disLike = async (body) => {
  try {
    const result = await axios.patch(`/api/blogDisLike`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("DisLike Failed", err.message);
  }
};

const addComment = async (body) => {
  try {
    const result = await axios.post(`/api/comment`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("comment Failed", err.message);
  }
};

const updateComment = async (body) => {
  try {
    const result = await axios.patch(`/api/comment`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("comment Failed", err.message);
  }
};

const deleteComment = async (body) => {
  try {
    const result = await axios.patch(`/api/delete_comment`, body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("comment Failed", err.message);
  }
};

const search_filter_pagination = async (body) => {
  const { findBy, findValue, sortBy, sortedOrder, page, size } = body;
  try {
    const result = await axios.get(
      `/api/blogdata?findBy=${findBy}&findValue=${findValue}&sortBy=${sortBy}&sortedOrder=${sortedOrder}&page=${page}&size=${size}`,
      body
    );
    if (result) {
      return result.data.data;
    }
  } catch (err) {
    console.log("search_filter_pagination Failed", err.message);
  }
};

export {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
  register,
  login,
  getAllpostsOfIndivisualUser,
  updateUserById,
  getUserById,
  email_Number_Varification,
  OTPVarification,
  changePassword,
  getUserByEmail,
  follow,
  unFollow,
  alreadyFollowing,
  like,
  disLike,
  alreadyLiked,
  addComment,
  updateComment,
  deleteComment,
  search_filter_pagination,
};
