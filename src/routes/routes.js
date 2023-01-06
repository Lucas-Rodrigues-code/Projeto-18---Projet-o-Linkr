import { Router } from "express";

import  { likePost, unlikePost,mkPost,getPosts } from "../controllers/posts.controller.js";
import { mkPostValidation } from "../middlewares/posts.validation.middleware.js";
import userRouter from "./user.router.js"
//importe suas rotas aqui
const router = Router();

router.use(userRouter);

router.post("/timeline", mkPostValidation,mkPost)
router.get("/timeline", getPosts)
router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);

export default router;