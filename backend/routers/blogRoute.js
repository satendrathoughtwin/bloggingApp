import express from "express";
import { createBlog, deleteBlog, disLike, getAllBlog, getBlogById, getBlogByUserEmail, isIN_MY_Like_List, like, updateBlog } from "../controller/blogController.js";
const router = express.Router()
router.get('/blog',getAllBlog)
router.get('/blog/:Id',getBlogById)
router.get('/userblog/:userEmail',getBlogByUserEmail)


router.post('/blog',createBlog)

router.patch('/blogLike',like)
router.patch('/blogDisLike',disLike)
router.patch('/blog/:Id',updateBlog)
router.patch('/blogLikeIsExist',isIN_MY_Like_List)

router.delete('/blog/:Id',deleteBlog)
export default router;