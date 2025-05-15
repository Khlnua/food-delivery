import { Schema, model, models, Model } from "mongoose";

type FoodCategorySchemaType = {
  catergoryName: string;
};

const FoodCategorySchema = new Schema<FoodCategorySchemaType>(
  {
    catergoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export const FoodCategoryModel: Model<FoodCategorySchemaType> =
  models["FoodCategory"] || model("FoodCategory", FoodCategorySchema);
