import express from "express";
import { identifyDish, getDish, addDish } from "../controllers/index";

const router = express.Router();

router.post("/identify",  identifyDish);
router.get("/:dish", getDish);
router.post("/", addDish);

export default router;
