import { Schema, model, models, Model } from "mongoose";

type FoodCategorySchemaType = {
  catergoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const FoodCategorySchema = new Schema<FoodCategorySchemaType>({
  catergoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const FoodCategoryModel: Model<FoodCategorySchemaType> =
  models["FoodCategory"] || model("FoodCategory", FoodCategorySchema);
