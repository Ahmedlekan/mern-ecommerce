
import { Link } from "react-router-dom"
import { FaSearch } from 'react-icons/fa';
import {LogOut, UserCog } from "lucide-react";
import userImg from "../../assets/images/user.svg"
import wishlist from "../../assets/images/wishlist.svg"

import { useAppContext } from "../../contexts/AppContext";
import * as authClient from "../../apiClient/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import ROLE from "../../constant/role";
import { FaShoppingCart } from "react-icons/fa";
import { useState, FormEvent } from "react";
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
  const {isLoggedIn, showToast, user, setUser, saveSearchValues} = useAppContext()
  const {cartItems} = useCartContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>("")

  const handleSubmit = (event: FormEvent) => {
   event.preventDefault()
   saveSearchValues(title,"")
   navigate("/product-category")
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
    <header className=" bg-coral-red py-3 px-4">
      
      <nav className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Diplo.com</Link>
        </span>

        {/* Search bar in the middle */}
        <div className="flex items-center w-full max-w-xl mx-4">
          <input
            type="text"
            className="w-full px-3 py-2 text-gray-700 border 
              border-gray-300 rounded-l-md focus:outline-none"
            placeholder="Search product here..."
            onChange={ (event)=> setTitle(event.target.value)}
          />
          
          <button className="px-4 py-2 text-white bg-yellow-500 
            rounded-r-md hover:bg-yellow-600 focus:outline-none" 
            onClick={handleSubmit}
          >
            <FaSearch size={25} />
          </button>
        
        </div>

        <ul className=" flex justify-center items-center gap-16 
          max-lg:hidden text-white">

          <Link to="/favorite">
            <div className="flex justify-center items-center gap-4">
              <img src={wishlist} className=" h-10 w-10"/>
              <div className=" flex flex-col items-center">
                <p>Favorite</p>
                <p>Wishlist</p>
              </div>
            </div>
          </Link>

          {isLoggedIn ? 
            
            (<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-black rounded-full">
                  <AvatarFallback className="bg-black rounded-full py-2 px-3 
                    text-white font-extrabold cursor-pointer"
                  >
                    {user?.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent side="right" className="w-56 bg-white text-black 
                p-2 mt-2 shadow-lg rounded-md">
                <DropdownMenuLabel>Logged in as {user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/account")} 
                  className="flex items-center cursor-pointer"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClick} 
                  className="flex items-center cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            
            </DropdownMenu>)
            
            : (
              <div className="flex justify-center items-center gap-4">
                <div className=" flex items-center">
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                  <img src={userImg} alt="" />
                </div>
              </div>
            )
          }

          <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              
              size="icon"
              className="relative"
            >
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
              {cartItems?.length || 0}
              </span>
              <span className="sr-only">User cart</span>
            </Button>

            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
            />
          </Sheet>

        </ul>

      </nav>
    </header>
  )
}

export default Navbar
