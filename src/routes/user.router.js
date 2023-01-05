import { Router } from "express";
import {signInBodyValidation,userValidation} from '../middlewares/user.middleware.js';
import {signIn, signUp} from '../controllers/user.controller.js';

const router = Router();

router.post("/sign-up",userValidation,signUp)
router.post("/sign-in",signInBodyValidation,signIn)

export default router;