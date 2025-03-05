import express,{Request, Response} from  "express"
import User from "../models/user"
import { ProductsType } from "../shared/types"
import Product from "../models/products"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check, validationResult} from "express-validator"
import verifyToken from "../middlewares/auth"
import multer from "multer"
import cloudinary from "cloudinary"

const router = express.Router()

// This storage engine stores the files in memory as buffers instead of writing them to disk. 
// It's suitable for handling small files or scenarios where you don't want to persist files to disk.
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024, // 5MB
    }
})

// Add new product
router.post("/",verifyToken, upload.array("imageFiles", 6),
    async (req:Request, res:Response)=>{
        try {
            // Get the array of uploaded image files from the request
            const imageFiles = req.files as Express.Multer.File[]

            // Check if req.files exists and contains images
            if (!imageFiles || imageFiles.length === 0) {
                return res.status(400).json({ message: "No images uploaded" });
            }
            
            const newProduct: ProductsType = req.body

            // uploading the image to cloudinary
            const imageUrls = await uploadImages(imageFiles)
            console.log('Uploaded Image URLs:', imageUrls);
            
            //if the upload was successful add the imageUrls to the newHotel
            newProduct.imageUrls = imageUrls
            newProduct.userId = req.userId

            //save the new hotel in our data base
            const product = new Product(newProduct)
            await product.save()
            res.status(201).send(product)

        } catch (error) {
            console.log("Eror creating: ", error)
            res.status(500).json({message: "Something went wrong"})
        }
})

// fetch all product
router.get("/", verifyToken, async (req : Request, res: Response)=>{

    try {

        const allProducts = await Product.find().sort({createdAt : -1})
        res.json(allProducts)
        
    } catch (error) {
        res.status(500).json({message: "Error fetching Products"})   
    }
})

// GET a single product from the list of added hotel
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  
    const id = req.params.id.toString();
  
    try {
    const product = await Product.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product" });
  }
});

// For editing a product and its images
router.put("/:id", verifyToken, upload.array("imageFiles"), async(req:Request, res:Response)=>{
    
    try {
        
        // Extract product ID from the URL
        const productId = req.params.id;

        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Extract the updated product fields from the request body (excluding images)
        const { imageUrls, ...updatedProductData } = req.body;

        // Update the fields in the product object
        Object.assign(product, updatedProductData);

        // Handle image files if new ones are uploaded
        const files = req.files as Express.Multer.File[];
        let updatedImageUrls: string[] = [];

        if (files && files.length > 0) {
            // Upload new images and get their URLs
            updatedImageUrls = await uploadImages(files);
        }

        // Merge the new image URLs with the existing ones
        product.imageUrls = [...updatedImageUrls, ...(imageUrls || product.imageUrls)];

        await product.save()
        res.status(201).json(product)

    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
})

//for deleting a product

router.delete("/:productId", verifyToken, async(req: Request, res: Response)=>{

    try {
        // Find and delete the product by its ID and the user who owns it
        const product = await Product.findOneAndDelete({
          _id: req.params.productId,
          userId: req.userId
        });
    
        if (!product) {
          // If no product is found, send a 404 Not Found response
          return res.status(404).json({ message: "Product not found" });
        }
    
        // Return success message after deletion
        return res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Server error while deleting product" });
      }
})



const  uploadImages = async (imageFiles: Express.Multer.File[])=>{
    // Upload the images to Cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
        // Convert the image buffer to a base64-encoded string
        const b64 = Buffer.from(image.buffer).toString("base64")
        // Construct a data URI with the image's MIME type
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        // Upload the image to Cloudinary and await the response
        const res = await cloudinary.v2.uploader.upload(dataURI)
        // Return the URL of the uploaded image
        return res.url
    })
    // Wait for all image upload promises to resolve
    const imageUrls = await Promise.all(uploadPromises)

    return imageUrls
}

export default router