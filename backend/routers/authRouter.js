import expres from "express";
import { registerUser, signInUser } from "../controller/authController.js";

const route = expres.Router();
route.post("/userRegister", registerUser);
route.post("/userLogin", signInUser);
export default route;
