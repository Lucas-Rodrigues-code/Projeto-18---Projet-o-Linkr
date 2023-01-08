import { Router } from "express";
import { getAllTrends, getPostByTrend, postTrend } from "../controllers/hashtag.controller.js";
import { tokenValidation } from "../middlewares/hashtag.validation.js";

const router = Router()

router.get("/hashtag", getAllTrends)
router.get("/trends/:hashtag", getPostByTrend)
router.post("/trends", postTrend)

export default router;