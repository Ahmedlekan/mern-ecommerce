import { useState } from "react"
import img from "../../assets/images/img.jpg"
import Button from '../../component/ui/Button'
import { useCartContext } from '../../contexts/CartContext'
import UserCartItemsContent from '../../component/general-view/UserCartItemsContent'
import { useQuery } from "@tanstack/react-query"
import * as generalApiClient from "../../apiClient/general"
import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from "react-router"

const Checkout = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { refetch } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () => generalApiClient.createPaymentIntent(cartItems),
    enabled: false, // Only run on user action
});

const handlePayment = async () => {
  setLoading(true);
  try {
      // Get the session URL from the result of `refetch`
      const { data: fetchedSessionUrl } = await refetch();

      // Redirect immediately after getting the URL
      if (fetchedSessionUrl) {
          console.log("Redirecting to Stripe:", fetchedSessionUrl);
          window.location.href = fetchedSessionUrl; // Redirect to Stripe session
      } else {
          console.error("Session URL not found");
      }
  } catch (error) {
      console.error("Error initiating payment", error);
  } finally {
      setLoading(false);
  }
};


  
  const {cartItems} = useCartContext()

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-md">
        <img src={img} alt="Product image" className="h-full w-full object-cover object-center" />
      </div>

      <div className="mt-6">
        {cartItems && cartItems.length > 0 ? (
          <div className="flex flex-col gap-6">
            {/* Cart Items List */}
            {cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} item={item} />
            ))}

            {/* Total Price Section */}
            <div className="flex justify-between items-center mt-6 p-4 
              bg-gray-100 rounded-lg shadow-inner"
            >
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg text-red-500">${totalCartAmount}</span>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <Button 
                onClick={handlePayment} 
                className="w-full py-3 bg-coral-red text-white rounded-lg 
                  hover:bg-red-500 transition duration-300 ease-in-out" 
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Checkout with Stripe'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg shadow-inner">
            <FaShoppingCart className="w-12 h-12 text-gray-400" />
            <p className="font-semibold text-center text-gray-600">Your cart is empty.</p>
            <Button 
              onClick={() => navigate('/product-category')} 
              className="w-full mt-4 py-3 bg-coral-red text-white 
                rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
            >
              Let's go shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout