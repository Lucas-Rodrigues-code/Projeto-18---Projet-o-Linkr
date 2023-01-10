import { Router } from "express";

import { likePost, unlikePost, mkPost, getPosts, getPostsByUserId } from "../controllers/posts.controller.js";
import { mkPostValidation, tokenValidation } from "../middlewares/posts.validation.middleware.js";
import userRouter from "./user.router.js"
//importe suas rotas aqui
const router = Router();

router.use(userRouter);

router.post("/timeline", mkPostValidation,mkPost)
router.get("/timeline", getPosts)
router.post("/likes/:postId", tokenValidation, likePost);
router.delete("/likes/:postId", tokenValidation, unlikePost);

export default router;