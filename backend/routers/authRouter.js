import expres from "express";
import {
  email_Number_Varification,
  follow,
  forgetPassword,
  getUserByEmail,
  getUserById,
  registerUser,
  signInUser,
  unfollow,
  updateUser,
  verify_Verification_Code,
  isIN_MY_Following_And_Follower_List
} from "../controller/authController.js";

const route = expres.Router();

route.get("/userfind/:userId", getUserById);
route.get("/userfindByEmail/:email", getUserByEmail);
route.patch("/isInMyFollowingAndFollowerList", isIN_MY_Following_And_Follower_List);

route.post("/userRegister", registerUser);
route.post("/userLogin", signInUser);

route.patch("/userUpdate/:userId", updateUser);
route.patch("/forgetPassword", forgetPassword);
route.patch("/email_Number_Varification", email_Number_Varification);
route.patch("/verify_Verification_Code", verify_Verification_Code);
route.patch("/follow", follow);
route.patch("/unFollow", unfollow);

export default route;
