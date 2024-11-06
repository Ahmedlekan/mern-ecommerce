import mongoose from "mongoose"
import { CartType } from "../shared/types";



const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});


const Cart = mongoose.model<CartType>("Cart", CartSchema);

export default Cart
