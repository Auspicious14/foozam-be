import { Request, Response } from "express";
import Food, { IFood, ILocation } from "../models";
import { mapFiles } from "../middlewares/file";
import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

export const identifyDish = async (req: Request, res: Response) => {
  try {
    const file = req.body.file;
    console.log({file}, req.body)
    if (!file || !file.uri) {
      res.status(400).json({ error: "No image provided" });
    }

    const imageBuffer = Buffer.from(
      file.uri.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    console.log({imageBuffer})

    const files = await mapFiles([file]);
    if (!files)
      res.status(404).json({ error: "Error uploading Image to cloudinary" });

    const response = await axios.post(
      `${process.env.CLASSIFY_SERVICE_URL}/api/foods/classify`,
      { image: imageBuffer },
      { headers: { "Content-Type": "application/json" } }
    );


    const { confidence, predictions: topPredictions } = response?.data
    console.log({confidence, topPredictions})
    let bestMatch: IFood | null = null;

    if (topPredictions.length > 0) {

      bestMatch = await Food.findOne({
        dish: new RegExp(topPredictions[0].className, "i"),
      });

    }

    console.log({bestMatch})

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
