import { Router } from "express";
import  { likePost, unlikePost } from "../controllers/posts.controller.js";

//importe suas rotas aqui
const router = Router();

//use suas rotas aqui

router.post("/likes/:postId", likePost);
router.delete("/likes/:postId", unlikePost);
//router.use();
 
export default router;