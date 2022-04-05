import expres from "express";
import { getUserById, registerUser, signInUser, updateUser } from "../controller/authController.js";

const route = expres.Router();
route.post("/userRegister", registerUser);
route.post("/userLogin", signInUser);
route.patch("/userUpdate/:userId", updateUser);
route.get("/userfind/:userId", getUserById);
export default route;
