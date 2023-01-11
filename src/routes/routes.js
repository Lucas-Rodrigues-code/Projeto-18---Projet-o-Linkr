import { Router } from "express";

import  { likePost, unlikePost,mkPost,getPosts,getPostsByUserId } from "../controllers/posts.controller.js";
import { mkPostValidation } from "../middlewares/posts.validation.middleware.js";
import userRouter from "./user.router.js"
import followRouter from "../routes/followers.routes.js"
//importe suas rotas aqui
const router = Router();

router.use(userRouter);
router.use(followRouter);

router.post("/timeline", mkPostValidation,mkPost)
router.get("/timeline", getPosts)
router.get("/timeline/:id",getPostsByUserId)
router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);

export default router;