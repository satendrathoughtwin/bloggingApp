import express from "express";
import { createBlog, deleteBlog, getAllBlog, getBlogById, updateBlog } from "../controller/blogController.js";
const router = express.Router()
router.post('/blog',createBlog)
router.get('/blog',getAllBlog)
router.get('/blog/:Id',getBlogById)
router.patch('/blog/:Id',updateBlog)
router.delete('/blog/:Id',deleteBlog)
export default router;