import { Router } from "express";
import userRouter from "./user.router.js"
import  { likePost, unlikePost } from "../controllers/posts.controller.js";

//importe suas rotas aqui
const router = Router();

//use suas rotas aqui

router.use(userRouter);
router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);

export default router;