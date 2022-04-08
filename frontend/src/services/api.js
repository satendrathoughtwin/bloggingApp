import axios from "axios";
const createPost = async (body) => {
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
  try {
    const result = await axios.get(`http://localhost:8000/api/blog/${postId}`);
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
      return result.data.numberFound
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const OTPVarification = async (body) => {
  try {
    const result = await axios.patch(`/api/user/verify_Verification_Code`,body);
    if (result) {
      return result.data.status;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};

const changePassword = async (body) => {
  try {
    const result = await axios.patch(`/api/user/forgetPassword`,body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("Email Send failed", err.message);
  }
};


const follow = async (body) => {
  try {
    const result = await axios.patch(`/api/user/follow`,body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("follow Failed", err.message);
  }
};

const unFollow = async (body) => {
  try {
    const result = await axios.patch(`/api/user/unFollow`,body);
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log("follow Failed", err.message);
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
};
