import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Button from "../ui/Button";
import {SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet";
import UserCartItemsContent from "./UserCartItemsContent";
import { CartItemItemsProps } from "../../../../backend/src/shared/types";

type UserCartWrapperProps = {
    cartItems: CartItemItemsProps[]; // Array of cart items
    setOpenCartSheet: React.Dispatch<React.SetStateAction<boolean>>; // Function to open/close the cart modal
  };

function UserCartWrapper({ cartItems, setOpenCartSheet }: UserCartWrapperProps) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
      {cartItems && cartItems.length > 0
        ? cartItems.map((item) => {
            return <UserCartItemsContent key={item.productId} item={item} />;
          })
        : (
          <div className="flex flex-col items-center gap-2">
            <FaShoppingCart className="w-6 h-6" />
            <p className=" font-bold text-center">Your cart is empty.</p>
          </div>
        )}
    </div>

    {cartItems && cartItems.length > 0 
    ?(
      <>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <Button
          onClick={() => {
            navigate("/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full mt-6"
        >
          Checkout
        </Button>
      </>
      ) 
    : (
      <Button
          onClick={() => {
            navigate("/product-category");
            setOpenCartSheet(false);
          }}
          className="w-full mt-6"
        >
          Let's go shopping
        </Button>
    ) }     
     
    </SheetContent>
  );
}

export default UserCartWrapper;