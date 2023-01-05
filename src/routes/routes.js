import { Router } from "express";
import { likePost, viewLikes } from "../controllers/posts.controller.js";
//importe suas rotas aqui
const router = Router();

//use suas rotas aqui

router.post("/likes", likePost);
router.get("/likes", viewLikes);
//router.use();
 
export default router;