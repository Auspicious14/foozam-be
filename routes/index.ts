import express from "express";
import { identifyDish, getDish, addDish } from "../controllers/index";

const router = express.Router();

router.post("/dishes/identify", identifyDish);
router.get("/dishes/:dish", getDish);
router.post("/dishes", addDish);

export default router;
