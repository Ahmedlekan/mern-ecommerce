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
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        
        {cartItems && cartItems.length > 0 ? (
          <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <UserCartItemsContent item={item} />
              ))
            : null}
          
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handlePayment} className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Checkout with Stripe"}
            </Button>
          </div>
        </div>
        ):(
          <div className="flex flex-col items-center gap-2">
            <FaShoppingCart className="w-6 h-6" />
            <p className=" font-bold text-center">Your cart is empty.</p>
            <Button
              onClick={() => {
              navigate("/product-category");
              
              }}
              className="w-full mt-6"
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