import express from "express";
import { identifyDish, getDish, addDish } from "../controllers/index";
import { classifyDish } from "../classify";

const router = express.Router();

router.post("/identify",  identifyDish);
router.get("/:dish", getDish);
router.post("/", addDish);
router.post('/classify', classifyDish)

export default router;
