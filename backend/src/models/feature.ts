import mongoose from "mongoose"
import { FeatureType } from "../shared/types";

const FeatureSchema = new mongoose.Schema(
  {image: String},
  { timestamps: true }
);

const Feature = mongoose.model<FeatureType>("Feature", FeatureSchema)

export default Feature