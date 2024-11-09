import { useState, FormEvent } from "react";
import { Link } from "react-router-dom"
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import userImg from "../../assets/images/user.svg"
import wishlist from "../../assets/images/wishlist.svg"

import { useAppContext } from "../../contexts/AppContext";
import * as authClient from "../../apiClient/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import ROLE from "../../constant/role";
import { Sheet } from "../ui/Sheet";
import Button from "../ui/Button";
import UserCartWrapper from "../general-view/CartWrapper";
import { useCartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,
  DropdownMenuSeparator,DropdownMenuTrigger, } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";


const Navbar = () => {

  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const {isLoggedIn, showToast, user, setUser, saveSearchValues} = useAppContext()
  const {cartItems} = useCartContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>("")

  const handleSubmit = (event: FormEvent) => {
   event.preventDefault()
   saveSearchValues(title,"")
   navigate("/product-category")
   setToggleMenu(false)
  };

  const mutation = useMutation({
      mutationFn: authClient.signOut,
      onSuccess: async ()=>{
          await queryClient.invalidateQueries({queryKey: ["validateToken"]});
          setUser(null)
          showToast({ message: "Signed Out!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
          showToast({ message: error.message, type: "ERROR" });
        },
  })

  const handleClick = ()=>{
      mutation.mutate()
  }

  return (
    <header className="bg-coral-red py-3 px-4">
      <nav className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" onClick={() => setToggleMenu(false)}>Diplo.com</Link>
        </span>

        {/* Mobile Toggle Button for Menu */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Cart Button */}
          <Button onClick={() => setOpenCartSheet(true)} size="icon" className="relative">
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
              {cartItems?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>

          {/* Menu Toggle Button */}
          <button className="text-white text-2xl" onClick={() => setToggleMenu(!toggleMenu)}>
            {toggleMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center w-full max-w-xl mx-4">
          <div className="flex w-full">
            <input
              type="text"
              className="w-full h-12 px-4 text-gray-700 border border-gray-300 
                rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500 
                focus:border-transparent"
              placeholder="Search product here..."
              onChange={(event) => setTitle(event.target.value)}
            />
            <button
              className="w-12 h-12 flex items-center justify-center bg-yellow-500 
                rounded-r-md hover:bg-yellow-600 focus:outline-none focus:ring-2 
                focus:ring-yellow-500 focus:border-transparent"
              onClick={handleSubmit}
            >
              <FaSearch size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex justify-center 
          items-center gap-8 text-white"
        >
          <Link to="/favorite">
            <div className="flex justify-center items-center gap-4">
              <img src={wishlist} className="h-10 w-10" alt="wishlist" />
              <div className="flex flex-col items-center">
                <p>Favorite</p>
                <p>Wishlist</p>
              </div>
            </div>
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-black rounded-full cursor-pointer">
                  <AvatarFallback className="bg-black rounded-full py-2 px-3 text-white font-extrabold">
                    {user?.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-56 bg-white text-black p-2 mt-2 shadow-lg rounded-md">
                <DropdownMenuLabel>Logged in as {user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { navigate("/account"); setToggleMenu(false); }} className="flex items-center cursor-pointer">
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { handleClick(); setToggleMenu(false); }} className="flex items-center cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="flex items-center gap-4" onClick={() => setToggleMenu(false)}>
              <p>Login</p>
              <img src={userImg} alt="User Icon" />
            </Link>
          )}

          <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button onClick={() => setOpenCartSheet(true)} size="icon" className="relative">
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
                {cartItems?.length || 0}
              </span>
              <span className="sr-only">User cart</span>
            </Button>
            <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.length > 0 ? cartItems : []} />
          </Sheet>
        </ul>

        {/* Mobile Menu */}
        {toggleMenu && (
          <div className="fixed top-0 left-0 w-full h-full 
            bg-coral-red z-50 flex flex-col items-center 
            justify-center text-white gap-6 p-4"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => setToggleMenu(false)}
            >
              <FaTimes />
            </button>

            {/* Mobile Search */}
            <div className="w-2/4 max-w-xl">
              <input
                type="text"
                className="w-full px-4 py-3 text-gray-700 border 
                border-gray-300 rounded-md focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Search product here..."
                onChange={(event) => setTitle(event.target.value)}
              />
              <button
                className="flex items-center justify-between mt-4 w-full px-4 py-3 text-white 
                bg-yellow-500 rounded-md hover:bg-yellow-600 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500
                  focus:border-transparent"
                onClick={handleSubmit}
              >
                <FaSearch size={20} /> Search
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-4 items-center">
              <Link to="/favorite" className="flex items-center gap-2" 
                onClick={() => setToggleMenu(false)}
              >
                <p className="text-lg">Favorite</p>
              </Link>
              {isLoggedIn ? (
                <>
                  <button onClick={() => { navigate("/account"); setToggleMenu(false); }}
                    className="text-lg"
                  >
                    Account
                  </button>
                  <button onClick={() => { handleClick(); setToggleMenu(false); }} 
                    className="text-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-lg" onClick={() => setToggleMenu(false)}>
                  Login
                </Link>
              )}
            </div>
            
          </div>
        )}
      </nav>
  </header>
  )
}

export default Navbar
