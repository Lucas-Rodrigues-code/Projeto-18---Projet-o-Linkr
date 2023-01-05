import { Router } from "express";
import  { likePost, unlikePost,mkPost } from "../controllers/posts.controller.js";

//importe suas rotas aqui
const router = Router();

//use suas rotas aqui
router.post("/timeline", mkPost)
router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);
//router.use();
 
export default router;