import { Router } from "express";

import userRouter from "./user.router.js"
import  { likePost, unlikePost } from "../controllers/posts.controller.js";

import  { likePost, unlikePost,mkPost,getPosts } from "../controllers/posts.controller.js";
import { mkPostValidation } from "../middlewares/posts.validation.middleware.js";

//importe suas rotas aqui
const router = Router();

//use suas rotas aqui


router.use(userRouter);

router.post("/timeline", mkPostValidation,mkPost)
router.get("/timeline", getPosts)
router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);

export default router;