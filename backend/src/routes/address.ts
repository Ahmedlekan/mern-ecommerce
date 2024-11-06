import express,{Request, Response} from  "express"
import {validationResult, param} from "express-validator"
import verifyToken from "../middlewares/auth"
import Address from "../models/address"
import { AddressType } from "../shared/types"

const router = express.Router()

// create new address
router.post("/add", async (req : Request, res: Response)=>{

   try {

    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newlyCreatedAddress = new Address({userId,address,city,pincode,notes,phone});
 
    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });

   } catch (e) {
        console.error(e);
        res.status(500).json({
        success: false,
        message: "Error",
        });
   }
})

// fetch all address
router.get("/get", async (req : Request, res: Response)=>{

   try {

    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
    
   } catch (e) {

    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
    
   }
})

// edit address
router.put("/edit", async (req : Request, res: Response)=>{

   try {

    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address ID are required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });

    
   } catch (e) {

    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
    
   }
})

// delete address
router.delete("/delete", async (req : Request, res: Response)=>{

   try {

    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address ID are required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });

    
   } catch (e) {

    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
    
   }
})









export default router