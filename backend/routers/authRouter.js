import expres from "express";
import {
    email_Number_Varification,
  forgetPassword,
  getUserById,
  registerUser,
  signInUser,
  updateUser,
  verify_Verification_Code,
} from "../controller/authController.js";

const route = expres.Router();

route.get("/userfind/:userId", getUserById);

route.post("/userRegister", registerUser);
route.post("/userLogin", signInUser);

route.patch("/userUpdate/:userId", updateUser);
route.patch("/forgetPassword", forgetPassword);
route.patch("/email_Number_Varification", email_Number_Varification);
route.patch("/verify_Verification_Code", verify_Verification_Code);

export default route;
