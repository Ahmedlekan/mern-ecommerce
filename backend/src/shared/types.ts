
export type UserType = {
  _id: string;
  name: string
  email: string;
  password: string;
  profilePic?: string,
  role: string,
  createdAt?: Date,
  updatedAt?: Date
};

export type FeatureType = {
  image: string
}

export type ProductsType = {
  _id: string;
  userId: string;
  imageUrls: string[],
  title: string,
  description: string,
  category: string,
  brand: string,
  price: number,
  salePrice: number,
  totalStock: number,
  averageReview: number

  quantity: number
}


export type ProductSearchResponse = {
  data: ProductsType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CartItemItemsProps = {
  productId: string
  title: string
  price: number;
  salePrice: number;
  image: string[];
  quantity: number
};
 
export type CartItem = {
  productId: ProductsType 
  quantity: number
};

export type CartType = {
  userId: string
  items: CartItem[]; 
}


export type AddressType = {
  userId: string
  address: string
  city: string
  pincode: string
  phone: string
  notes: string
}
