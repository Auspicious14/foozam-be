import express from "express";
import { identifyDish, getDish, addDish, getDishLocations } from "../controllers/index";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/dishes/identify", identifyDish);
router.get("/dishes/:dish", getDish);
router.post("/dishes", protect, addDish);
router.get("/dishes/:dish/locations", getDishLocations);

export default router;
