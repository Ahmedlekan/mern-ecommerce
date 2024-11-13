import { useCartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

const Favorites = () => {

    const {favoriteItems, toggleFavorite, addToCartHandler} = useCartContext()

    if (favoriteItems.length === 0) {
        return <p>Your favorites list is empty.</p>;
    }

  return (
    <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">Your Favorites</h2>
            <div className="space-y-4">
                {favoriteItems.map((product) => (
                    <div key={product._id} className="flex items-start 
                        bg-white shadow-md rounded-lg p-4"
                    >
                        <Link to={`/product/${product._id}`} className="flex-shrink-0">
                            <img
                                src={product.imageUrls[0]}
                                alt={product.title}
                                className="h-20 w-20 object-cover rounded-md"
                            />
                        </Link>
                        <div className="ml-4 flex-grow">
                            <Link to={`/product/${product._id}`} className="block font-semibold 
                                text-lg hover:underline"
                            >
                                {product.title}
                            </Link>
                            <p className="text-gray-500">Condition: Pre-owned</p>
                            <p className="text-sm text-gray-400">{product.brand}</p>
                            <p className="text-sm text-gray-400">{product.category}</p>
                            <p className="text-gray-700 mt-2">
                                Price: <span className="font-semibold">${product.salePrice.toFixed(2)}</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-end ml-4">
                            <button
                                onClick={() => toggleFavorite(product)}
                                className="text-red-500 text-sm underline hover:text-red-600 mb-2"
                            >
                                Remove
                            </button>
                            <button className="bg-coral-red text-white py-2 
                                px-4 rounded-md shadow hover:bg-red-500 mb-2"
                                onClick={() => addToCartHandler(product, true)} // Pass true to redirect to checkout
                            >
                                Buy It Now
                            </button>
                            <button className="border border-gray-300 py-2 
                                px-4 rounded-md shadow hover:bg-gray-100 mb-2"
                                onClick={()=>addToCartHandler(product)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Favorites