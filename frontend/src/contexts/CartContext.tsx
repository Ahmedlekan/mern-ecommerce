import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import * as generalApiClient from "../apiClient/general"
import { useQuery } from '@tanstack/react-query';
import { CartItemItemsProps} from '../../../backend/src/shared/types';
import { ProductsType } from '../../../backend/src/shared/types';
import { useAppContext } from './AppContext';
import { addToCart, updateCartQuantity, deleteCartItem } from '../apiClient/general';
// import { useNavigate } from 'react-router';

interface CartContextType {
    cartItems: CartItemItemsProps[];
    addToCartHandler: (product: ProductsType, redirectToCheckout?: boolean) => Promise<void>;
    updateQuantityHandler: (productId: string, quantity: number) => Promise<void>;
    deleteCartItemHandler: (productId: string) => Promise<void>;

    favoriteItems: ProductsType[];
    toggleFavorite: (product: ProductsType) => void;
    isFavorite: (productId: string) => boolean
}

// Define props for CartProvider
interface CartProviderProps {
    children: ReactNode;
}

// Create CartContext with default null value
const CartContext = createContext<CartContextType | null>(null);

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItemItemsProps[]>([]);
    const { showToast } = useAppContext();
    const [favoriteItems, setFavoriteItems] = useState<ProductsType[]>([]);

    // Load favorite items from localStorage on initial load
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteItems');
        if (savedFavorites) {
            setFavoriteItems(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (product: ProductsType) => {
        setFavoriteItems((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some(item => item._id === product._id);
            const updatedFavorites = isAlreadyFavorite
                ? prevFavorites.filter(item => item._id !== product._id)
                : [...prevFavorites, product];

                localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));

            return updatedFavorites
        });
    };

    const isFavorite = (productId: string) => favoriteItems.some(item => item._id === productId);

    // Fetch initial cart items
    const { data: fetchedCartItems } = useQuery({
        queryKey:["fetchCartItems"],
        queryFn: generalApiClient.fetchCartItems,
        staleTime: 1000 * 60 * 5, // cache data for 5 minutes
    });

    useEffect(() => {
        if (fetchedCartItems) {
            setCartItems(fetchedCartItems);
        }
    }, [fetchedCartItems]);

    const addToCartHandler = async (product: ProductsType, redirectToCheckout = false) => {
        
        try {

            // Add product to the cart
            await addToCart(product._id);
            
            // Update cartItems state
            setCartItems((prevItems) => {
                const existingItem = prevItems.find(item => item.productId === product._id);
    
                if (existingItem) {
                    return prevItems.map(item =>
                        item.productId === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    // Ensure the new item matches the CartItem type exactly
                    const newItem: CartItemItemsProps = {
                        productId: product._id,
                        title: product.title,
                        image: [product.imageUrls[0]], // Assuming it's the first image
                        price: product.price,
                        salePrice: product.salePrice,
                        quantity: 1
                    };
                    return [...prevItems, newItem];
                }
            });

            // If the product is a favorite, remove it from favoriteItems
        setFavoriteItems((prevFavorites) => {
            const isFavorite = prevFavorites.some(item => item._id === product._id);
            if (isFavorite) {
                const updatedFavorites = prevFavorites.filter(item => item._id !== product._id);
                
                // Save updated favorites to localStorage
                localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));

                return updatedFavorites;
            }
            return prevFavorites;
        });

            showToast({ message: "Product added to cart", type: "SUCCESS" });
            if (redirectToCheckout){
                window.location.href = "/checkout";
            }
        } catch (error) {
            showToast({ message: "Failed to add product to cart", type: "ERROR" });
        }
    };

    const updateQuantityHandler = async (productId: string, quantity: number) => {
        try {
            await updateCartQuantity(productId, quantity);
            setCartItems((prevItems) => prevItems.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            ));
            showToast({ message: "Quantity updated", type: "SUCCESS" });
        } catch (error) {
            showToast({ message: "Failed to update quantity", type: "ERROR" });
        }
    };

    const deleteCartItemHandler = async (productId: string) => {
        try {
            await deleteCartItem(productId);
            setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
            showToast({ message: "Product removed from cart", type: "SUCCESS" });
        } catch (error) {
            showToast({ message: "Failed to remove product from cart", type: "ERROR" });
        }
    };

    return (
        <CartContext.Provider 
            value={{ 
                cartItems, 
                addToCartHandler, 
                updateQuantityHandler, 
                deleteCartItemHandler ,
                favoriteItems, 
                toggleFavorite, 
                isFavorite
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for consuming CartContext
export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};
