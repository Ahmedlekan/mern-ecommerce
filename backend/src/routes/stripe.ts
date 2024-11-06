import express, { Request, Response } from "express";
import verifyToken from "../middlewares/auth";
import Stripe from 'stripe';
import User from "../models/user";
import {CartItemItemsProps } from "../shared/types";

const stripe = require('stripe')(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
    try {
        const cartItems = req.body.cartItems;

        // Ensure `cartItems` has data before proceeding
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Create line items from cartItems array
        const lineItems = cartItems.map((item: CartItemItemsProps) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: item.image,
                },
                unit_amount: Math.round(item.salePrice * 100), // Price in cents
            },
            quantity: item.quantity,
        })); 

        // Check that lineItems has valid data
        if (!lineItems || lineItems.length === 0) {
            return res.status(400).json({ error: "Invalid line items" });
        }

        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            billing_address_collection: "auto",
            customer_email: user.email,
            success_url: `${process.env.FRONTEND_URL}/checkout-success`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

export default router;
