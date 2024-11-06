import mongoose from "mongoose"
import { AddressType } from "../shared/types";

const AddressSchema = new mongoose.Schema(
    {
      userId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    { timestamps: true }
  );


  const Address = mongoose.model<AddressType>("Address", AddressSchema);

export default Address