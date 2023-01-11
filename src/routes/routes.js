import { Router } from "express";

import { likePost, unlikePost, mkPost, getPosts, getPostsByUserId } from "../controllers/posts.controller.js";
import { mkPostValidation, tokenValidation } from "../middlewares/posts.validation.middleware.js";
import userRouter from "./user.router.js"
//importe suas rotas aqui
const router = Router();

router.use(userRouter);

router.post("/timeline", mkPostValidation, mkPost)
router.get("/timeline", getPosts)
router.get("/timeline/:id", getPostsByUserId)
router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);
router.get("/total", getPostsNumber)
export default router;