import { Schema, model, models, Model } from "mongoose";

type FoodSchemaType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  createdAt: Date;
  updatedAt: Date;
  category: Schema.Types.ObjectId;
};

const FoodSchema = new Schema<FoodSchemaType>({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  category: {
    type: Schema.Types.ObjectId,
    ref: "FoodCategory",
    required: true,
  },
});

export const FoodModel: Model<FoodSchemaType> =
  models["Food"] || model("Food", FoodSchema);
