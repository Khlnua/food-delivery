import { Schema, model, models, Model, ObjectId } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type FoodOrderSchemaType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItems: {
    food: { type: Schema.Types.ObjectId; ref: "Food"; required: true };
    quantity: { type: Number; required: true };
  };
  status: FoodOrderStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderSchema = new Schema<FoodOrderSchemaType>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: { type: Number, required: true },
  foodOrderItems: [
    {
      food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: Object.values(FoodOrderStatusEnum),
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const FoodOrderModel: Model<FoodOrderSchemaType> =
  models["FoodOrder"] || model("FoodOrder", FoodOrderSchema);
