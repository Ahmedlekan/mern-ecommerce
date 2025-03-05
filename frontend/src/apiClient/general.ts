import {CartItemItemsProps, ProductsType } from "../../../backend/src/shared/types"
import { ProductSearchResponse } from "../../../backend/src/shared/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export type SearchParams = {
    title?: string;
    category?: string[]
    brand?: string[]
    page?: string;
    maxPrice?: string;
    sortOption?: string;
};

export const searchProducts = async (searchParams : SearchParams) : Promise<ProductSearchResponse> =>{
    // create new url params object
    const queryParams = new URLSearchParams()

    // Only append if values exist
    if (searchParams.title) queryParams.append("searchTerm", searchParams.title);
    if (searchParams.page) queryParams.append("page", searchParams.page);
    if (searchParams.sortOption) queryParams.append("sortOption", searchParams.sortOption);
    if (searchParams.maxPrice) queryParams.append("maxPrice", searchParams.maxPrice);

    searchParams.category?.forEach((cat)=> queryParams.append("category", cat))
    searchParams.brand?.forEach((bra)=> queryParams.append("brand", bra))
    
    const response = await fetch(`${API_BASE_URL}/api/general/search?${queryParams}`)

    if (!response.ok){
        throw new Error("Error fetching products")
    }

    return response.json()
}

export const CategoryList = async (): Promise<ProductsType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/general`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching products");
    }

    const result = await response.json()

    return result.data
}

export const fetchAllProduct = async (): Promise<ProductsType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/general/general-products`, {
        credentials: "include",
    })

    const data = await response.json();
    return data;
}

// product to the cart
export const addToCart = async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/general/add-to-cart`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({productId, quantity: 1}),
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
    
      const data =  await response.json();

      return data
}

// fetch cart Items
export const fetchCartItems = async () => {
    const response = await fetch(`${API_BASE_URL}/api/general/fetch-cart-items`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();

    // Ensure items are returned correctly
    return data.items || []; // Return an empty array if no items are found
};

// for creating payment intent
export const createPaymentIntent = async (cartItems: CartItemItemsProps[]) => {
    const response = await fetch(`${API_BASE_URL}/api/stripe/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),  // Send cart items to the backend
    });

    if (!response.ok) throw new Error("Error fetching payment intent");

    const { url } = await response.json();
    console.log("Stripe session URL:", url); 
    return url;
};

// fetch product by id
export const fetchProductById = async (productId: string):Promise<ProductsType> =>{
    const response = await fetch(`${API_BASE_URL}/api/general/${productId}`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
    
}

// update product quantity
export const updateCartQuantity = async (productId: string, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/api/general/update-cart-quantity`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to update cart quantity");
    }

    return response.json();
};

// delete an item from the cart
export const deleteCartItem = async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/general/delete-cart-item`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to delete cart item");
    }

    return response.json();
};






// // addresses

// export const addAddress = async (productFormData: FormData): Promise<AddressType> => {
    
//         const response = await fetch(`${API_BASE_URL}/api/addresses/add`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: productFormData,
//     });

//     if (!response.ok) {
//         throw new Error("Failed to add address");
//     }

//     const data = await response.json();
//     return data;
// };


// // fetch all address

// export const fetchAllAddresses = async (userId: string): Promise<AddressType[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/addresses/get/${userId}`, {
//         method: "GET",
//         credentials: "include",
//     });

//     if (!response.ok) {
//         throw new Error("Failed to fetch addresses");
//     }

//     const data = await response.json();
//     return data;
// };


// // edit address

// export const editAddress = async (
//     addressId: string,
//     userId: string,
//     formData: {address?: string;city?: string;pincode?: string;phone?: string; notes?: string}
// ): Promise<AddressType> => {
//     const response = await fetch(`${API_BASE_URL}/api/addresses/edit/${userId}/${addressId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to edit address");
//     }

//     const data = await response.json();
//     return data;
// };

// //delete an address

// export const deleteAddress = async (addressId: string, userId: string) => {
//     const response = await fetch(`${API_BASE_URL}/api/addresses/delete/${userId}/${addressId}`, {
//         method: "DELETE",
//         credentials: "include",
//     });

//     if (!response.ok) {
//         throw new Error("Failed to delete address");
//     }
// };








