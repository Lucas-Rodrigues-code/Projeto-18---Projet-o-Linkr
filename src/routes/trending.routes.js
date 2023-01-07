import { Router } from "express";
import { getAllTrends, getPostByTrend, postTrend } from "../controllers/hashtag.controller.js";
import { tokenValidation } from "../middlewares/hashtag.validation.js";

const router = Router()

router.get("/hashtag", tokenValidation, getAllTrends)
router.get("/hashtag/:hashtag", getPostByTrend)
router.post("/trends", tokenValidation, postTrend)

export default router;