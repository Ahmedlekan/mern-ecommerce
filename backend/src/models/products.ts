import mongoose from "mongoose"
import { ProductsType } from "../shared/types";

const ProductSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.SchemaTypes.ObjectId, 
      required: true, 
      index: true 
    },
    imageUrls: { type: [String], required: true },
    title: {
      type: String, 
      required: true
    },
    description: String,
    category: {
      type: String,
      required: true,
      index: true
    },
    brand: String,
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"]
    },
    salePrice: {
      type: Number,
      default: null
    },
    totalStock: {
      type: Number,
      required: true,
      min: [0, "Total stock cannot be negative"]
    },
    averageReview: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductsType>("Product", ProductSchema);
export default Product;




