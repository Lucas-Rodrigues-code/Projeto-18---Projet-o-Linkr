import { Router } from "express";
import userRouter from "./user.router.js"
//importe suas rotas aqui
const router = Router();

//use suas rotas aqui

router.use(userRouter);

 
export default router;