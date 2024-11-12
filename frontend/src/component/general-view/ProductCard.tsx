import { Link } from "react-router-dom"
import { ProductsType } from "../../../../backend/src/shared/types";
import { useCartContext } from "../../contexts/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type ProductCardProps = {
    product: ProductsType
    isLoading?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ product}) => {

    const { addToCartHandler, cartItems, toggleFavorite, isFavorite } = useCartContext();

    const isInCart = cartItems.some(item => item.productId === product._id);
    const isInFavorites = isFavorite(product._id);


    return (
        <div className='scrollbar-none transition-all bg-white 
            shadow-md rounded-lg overflow-hidden'
        >

<Link
                to={"/product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow"
            >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center relative">
                    <img
                        src={product?.imageUrls[0]}
                        className="object-contain h-full w-full max-w-[140px] hover:scale-110 transition-all mix-blend-multiply"
                        alt={product.title}
                    />
                    <button
                        className="absolute top-2 right-2 text-red-600 hover:text-red-500 transition"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation when clicking the favorite icon
                            toggleFavorite(product);
                        }}
                    >
                        {isInFavorites ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </div>
            </Link>

            <div className='p-4 grid gap-3'>
                <h2 className='font-medium text-base md:text-lg 
                    text-ellipsis line-clamp-1 text-black'
                >
                        {product?.title}
                </h2>

                <p className='capitalize text-slate-500'>
                        {product?.category}
                </p>
                
                <div className='flex justify-between items-center mt-2'>
                    <span className="text-lg font-semibold 
                        text-indigo-600"
                    >
                        ${product.price.toFixed(2)}
                    </span>
                    {product.salePrice && (
                        <span className="text-sm line-through 
                            text-gray-400"
                        >
                            ${product.salePrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <button className='text-sm bg-coral-red 
                    hover:bg-red-500 text-white 
                    px-3 py-0.5 rounded-full' 
                    onClick={()=>addToCartHandler(product)}
                
                >
                        {isInCart ? "In Cart" : "Add to Cart"}
                </button>
            </div>

        </div>

    );
  };

  export default ProductCard
  