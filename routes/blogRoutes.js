import {Router} from "express";
import { checkUserAuth } from "../middlewares/auth.middlewere.js";
import { createBlog, deleteBlog, getMyBlogs, getPublicBlogs, updateBlog, getSingleBlog } from "../controllers/blog.controller.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.post(
  "/create",
  checkUserAuth,
  upload.single("image"),
  createBlog
);
router.get("/public", checkUserAuth, getPublicBlogs);
router.get("/", checkUserAuth, getMyBlogs);
router.get("/:blogId", checkUserAuth, getSingleBlog);
router.put(
  "/update/:blogId",
  checkUserAuth,
  upload.single("image"),
  updateBlog
);
router.delete("/delete/:blogId", checkUserAuth, deleteBlog);




export default router;