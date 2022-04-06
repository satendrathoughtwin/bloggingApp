import axios from "axios";
const createPost = async (body) => {
  console.log("datattttta ----------->body");
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
  console.log("Post id is comming", postId);
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
      `http://localhost:8000/api/blog/${postId}`,
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
      `http://localhost:8000/api/blog/${postId}`
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
    console.log("userEmail", userEmail);
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

const email_Number_Varification = async (body) => {
  let payload ={emailNumberVarification : "", type : ""};
  const {email,number} = body;
  if(email)
  {
    payload.emailNumberVarification = email
    payload.type = "just for logic"
  }
  else{
    payload.emailNumberVarification = number
    payload.type = 1234567890
  }
  try {
    const result = await axios.patch(`/api/user/email_Number_Varification`,payload);
    if (result) {
      return result.data
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const OTPVarification = async (body) => {
  console.log("OTPVarification", body);
  try {
    const result = await axios.patch(`/api/user/verify_Verification_Code`,body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const changePassword = async (body) => {
  console.log("ForgetPasswordVarification", body);
  try {
    const result = await axios.patch(`/api/user/forgetPassword`,body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
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
  changePassword
};
