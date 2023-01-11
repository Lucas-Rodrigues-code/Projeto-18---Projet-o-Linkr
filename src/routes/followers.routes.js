import { Router } from "express";
import { Follow ,unFollow,isFollowed} from "../controllers/follow.controller.js";
import { validateToken, validateUserId } from "../middlewares/follow.middleware.js";

const router = Router();

router.get("/follow/:id", validateToken, validateUserId, isFollowed)
router.post("/follow/:id", validateToken, validateUserId, Follow);
router.delete("/follow/:id", validateToken, validateUserId, unFollow);

 
export default router;