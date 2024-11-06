import express,{Request, Response} from  "express"
import {validationResult, param} from "express-validator"
import verifyToken from "../middlewares/auth"
import Product from "../models/products"
import Cart from "../models/cart"
import { ProductsType } from "../shared/types"
import { ProductSearchResponse } from "../shared/types"

const router = express.Router()

//search hotel
router.get("/search", async (req:Request, res:Response)=>{
    try {

        const query = constructSearchQuery(req.query)

        let sortOptions = {}

        switch(req.query.sortOption){
            case "priceAsc":
                sortOptions = {price: 1}
                break
            case "priceDesc":
                sortOptions = {price: -1}
                break
        }

        const pageSize = 8
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber -1) * pageSize
        
        // list all the total product from the data base
        const products = await Product.find(query).sort(sortOptions).skip(skip).limit(pageSize)
        const total = await Product.countDocuments(query)
        // return the resposnse to the front end with its pagination
        const response: ProductSearchResponse = {
            data: products,
            pagination:{
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        }

        res.json(response)

    } catch (error) {
        console.log("error", error)
        res.status(500).json({message: "Something went wrong"})
    }
})

// for getting the first category product
router.get("/", async (req : Request, res: Response)=>{

    try {

        const oneProductCategeory = await Product.distinct("category")

        //array to store one product from each category
        const productByCategory: ProductsType[] = []

        for(const category of oneProductCategeory){
            const product = await Product.findOne({category }).select("title imageUrls category")

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            success: true,
            data: productByCategory.length > 0 ? productByCategory : []
        });
        
    } catch (error) {
        res.status(500).json({message: "Error fetching Products"})   
    }
})

// fetch all product
router.get("/general-products",  async (req : Request, res: Response)=>{

    try {

        const allProducts = await Product.find().sort({createdAt : -1})
        res.json(allProducts)
        
    } catch (error) {
        res.status(500).json({message: "Error fetching Products"})   
    }
})


// Add to cart route
router.post("/add-to-cart", verifyToken, async (req, res) => {

    try {

        const userId = req.userId; // Extracted from the decoded JWT token
        const { productId, quantity } = req.body;        
        
        // Fetch the full product details from the database
        const product = await Product.findById(productId);

        console.log(product)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                // Add a new product with all required fields
                cart.items.push({
                    productId, quantity
                });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

// fetch all cart items
router.get("/fetch-cart-items", verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemsWithDetails = cart.items.map((item) => ({
            productId: item.productId._id,
            title: item.productId.title,
            image: item?.productId.imageUrls ?? [], // Assuming it's the first image
            price: item.productId.price,
            salePrice: item.productId.salePrice,

            quantity: 1
        }));

        res.status(200).json({ success: true, items: itemsWithDetails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});;


// fetching Each product and its details
router.get("/:id", async(req:Request, res: Response)=>{

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const id = req.params.id.toString()

    try {
        const product = await Product.findById(id)
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error Fetching Product"})
    }
})

// Update cart item quantity
router.patch("/update-cart-quantity", verifyToken, async (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
        return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

// Delete a product from the cart
router.delete("/delete-cart-item", verifyToken, async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({ success: true, message: "Product removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});


const constructSearchQuery = (queryParams: any)=>{
    let constructedQuery: any = {};

    // Check if a search term (e.g., product name) is provided
    if (queryParams.searchTerm) {
        constructedQuery = {
            $or: [
                { title: { $regex: queryParams.searchTerm, $options: 'i' } },  // case-insensitive search on product title
                { description: { $regex: queryParams.searchTerm, $options: 'i' } },  // case-insensitive search on description
                { tags: { $regex: queryParams.searchTerm, $options: 'i' } }  // case-insensitive search on tags
            ]
        };
    }

    if (queryParams.category) {
        constructedQuery.category = {
            $in: Array.isArray(queryParams.category)
                ? queryParams.category
                : [queryParams.category]
        };
    }

    if (queryParams.brand && queryParams.brand.length > 0) {
        constructedQuery.brand = {
            $in: Array.isArray(queryParams.brand) ? queryParams.brand : [queryParams.brand]
        };
    }

    if(queryParams.maxPrice){
        constructedQuery.price = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        }
    }

    return constructedQuery;

}




export default router