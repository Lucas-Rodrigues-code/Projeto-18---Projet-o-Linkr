import { Router } from "express";

import { likePost, unlikePost, mkPost, getPosts, getPostsByUserId, getPostsNumber } from "../controllers/posts.controller.js";
import { mkPostValidation, tokenValidation } from "../middlewares/posts.validation.middleware.js";
import userRouter from "./user.router.js"
import followRouter from "../routes/followers.routes.js"
//importe suas rotas aqui
const router = Router();

router.use(userRouter);
router.use(followRouter);

router.post("/timeline", mkPostValidation, mkPost)
router.get("/timeline", getPosts)
router.get("/timeline/:id", getPostsByUserId)
router.post("/likes/:postId", tokenValidation, likePost);
router.delete("/likes/:postId", tokenValidation, unlikePost);
router.get("/total", getPostsNumber)
export default router;