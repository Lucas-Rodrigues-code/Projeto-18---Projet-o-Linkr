import { Router } from "express";

import  { likePost,mkPost,getPosts, userLikes } from "../controllers/posts.controller.js";
import { tokenValidation } from "../middlewares/hashtag.validation.js";
import { likedPostValidation, mkPostValidation } from "../middlewares/posts.validation.middleware.js";
import userRouter from "./user.router.js"
//importe suas rotas aqui
const router = Router();

router.use(userRouter);

router.post("/timeline", mkPostValidation,mkPost)
router.get("/timeline", getPosts);

router.get("/likes", userLikes);
router.post("/likes/:postId", likedPostValidation, likePost);

export default router;