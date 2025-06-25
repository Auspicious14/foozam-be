import { Request, Response } from "express";
import Food,  { IFood, ILocation } from "../models";
import * as tf from "@tensorflow/tfjs-node";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { mapFiles } from "../middlewares/files";

// Lazy-load MobileNet model for serverless
let model: mobilenet.MobileNet | null = null;
async function getModel() {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
}

export const identifyDish = async (req: Request, res: Response) => {
  try {
    const imageData = req.body.files
    if (!imageData) {
       res.status(400).json({ error: 'No image provided' });
    }
  
    const files = await mapFiles(imageData)
    if (!files) res.status(404).json({error: "Error uploading Image to cloudinary"})
    
    const file = files[0]
    
    const imageTensor = tf.node.decodeImage(file.uri) as tf.Tensor3D;
    const model = await getModel();
    const predictions = await model.classify(imageTensor);
    imageTensor.dispose();

    let bestMatch: IFood | null = null;
    let confidence = 0;
    let topPredictions: any[] = [];
    if (predictions.length > 0) {
      confidence = predictions[0].probability * 100;
      bestMatch = await Food.findOne({
        dish: new RegExp(predictions[0].className, "i"),
      });
      topPredictions = predictions.slice(0, 3).map((p) => ({
        dish: p.className,
        confidence: Math.round(p.probability * 100),
      }));
    }

    if (!bestMatch || confidence < 70) {
      res.status(200).json({
        message: "Low confidence. Top predictions:",
        predictions: topPredictions,
      });
    }

     res.status(200).json({
      dish: bestMatch.dish,
      recipe: bestMatch.recipe,
      tags: bestMatch.tags,
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
    const food = await Food.findOne({ dish: new RegExp(`^${dish}$`, "i") }).lean();
    if (!food)  res.status(404).json({ error: "Dish not found." });

    let locations: ILocation[] = food.locations;
    if (city) {
      locations = locations.filter(
        (loc) => loc.city.toLowerCase() === String(city).toLowerCase()
      );
    }
    res.json({ ...food.toObject(), locations });
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


