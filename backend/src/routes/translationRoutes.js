import express from "express";
import { alignWords } from "../controllers/translationController.js";

const router = express.Router();

router.post("/align", alignWords);

export default router;