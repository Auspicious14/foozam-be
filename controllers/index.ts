import { Request, Response } from "express";
import Food, { IFood, ILocation } from "../models";
import { mapFiles } from "../middlewares/file";
import dotenv from 'dotenv'

dotenv.config()

export const identifyDish = async (req: Request, res: Response) => {
  try {
    const imageData = req.body.files;
    if (!imageData) {
      res.status(400).json({ error: "No image provided" });
    }

    const imageBuffer = Buffer.isBuffer(imageData)
      ? imageData
      : Buffer.from(
          imageData.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
    const files = await mapFiles(imageData);
    if (!files)
      res.status(404).json({ error: "Error uploading Image to cloudinary" });

    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/foods/classify`,
      { image: imageData },
      { headers: { "Content-Type": "application/json" } }
    );

    const { confidence, predictions: topPredictions } = response?.data
    
    let bestMatch: IFood | null = null;

    if (predictions.length > 0) {
      confidence = predictions[0].probability * 100;

      bestMatch = await Food.findOne({
        dish: new RegExp(predictions[0].className, "i"),
      });

      topPredictions = predictions
        .slice(0, 3)
        .map((p: { className: string; probability: number }) => ({
          dish: p.className,
          confidence: Math.round(p.probability * 100),
        }));
    }

    if (!bestMatch || confidence < 70) {
      res.status(200).json({
        message: "Low confidence. Top predictions:",
        predictions: topPredictions,
        imageUrl: files[0].uri
      });
      return;
    }

    if (bestMatch && bestMatch.imageUrl) {
      bestMatch.imageUrl = files[0].uri
      await bestMatch.save()
    }

    res.status(200).json({
      dish: bestMatch.dish,
      recipe: bestMatch.recipe,
      tags: bestMatch.tags,
      imageUrl: bestMatch.imageUrl,
      locations: bestMatch.locations,
      confidence: Math.round(confidence),
      topPredictions,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to identify dish." });
  }
};

export const getDish = async (req: Request, res: Response) => {
  const { dish } = req.params;
  const { city } = req.query;
  try {
    const food = await Food.findOne({
      dish: new RegExp(`^${dish}$`, "i"),
    }).lean();

    if (!food) res.status(404).json({ error: "Dish not found." });

    let locations: ILocation[] = [];
    if (food && !Array.isArray(food)) {
      locations = food.locations as ILocation[];
      if (city) {
        locations = locations?.filter(
          (loc) => loc.city.toLowerCase() === String(city).toLowerCase()
        );
      }
      res.json({ ...food.toObject(), locations });
    } else {
      res.status(404).json({ error: "Dish not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dish." });
  }
};

export const addDish = async (req: Request, res: Response) => {
  try {
    const { dish, recipe, tags, locations } = req.body;
    const newFood = new Food({ dish, recipe, tags, locations });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ error: "Failed to add dish." });
  }
};
