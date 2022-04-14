import express from "express";
import {
  addComment,
  createBlog,
  deleteBlog,
  deleteComment,
  disLike,
  getAllBlog,
  getBlogById,
  getBlogByUserEmail,
  isIN_MY_Like_List,
  like,
  search_filter_pagination,
  updateBlog,
  updateComment,
} from "../controller/blogController.js";
const router = express.Router();
router.get("/blog", getAllBlog);
router.get("/blog/:Id", getBlogById);
router.get("/userblog/:userEmail", getBlogByUserEmail);
router.get("/blogdata", search_filter_pagination);

router.post("/blog", createBlog);
router.post("/comment", addComment);

router.patch("/blogLike", like);
router.patch("/blogDisLike", disLike);
router.patch("/blog/:Id", updateBlog);
router.patch("/blogLikeIsExist", isIN_MY_Like_List);
router.patch("/comment", updateComment);
router.patch("/delete_comment", deleteComment);

router.delete("/blog/:Id", deleteBlog);
export default router;
