import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


const NavbarBottom = () => {
  return (
    <nav className="bg-gray-800 py-2 px-4">
      <div className="container mx-auto flex gap-32">
        <div className="text-white">
          <Link to="/">
            <div className=' flex gap-2'>
                <p className='border-r-[2px] border-gray-500 
                  px-2 text-xs md:text-xl'>
                    SHOP CAREGORIES
                </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-white">
          <Link to="/" className="hover:text-yellow-500 text-xs md:text-xl">
           HOME
          </Link>
          
          <Link to="/product-category" className="hover:text-yellow-500 
            text-xs md:text-xl whitespace-nowrap">
            OUR STORES
          </Link>
          
          <Link to="/" className="hover:text-yellow-500 
            text-sm md:text-xl hidden md:block">
            BLOGS
          </Link>
          
          <Link to="/" className="hover:text-yellow-500 text-sm 
            md:text-xl hidden md:block">
            CONTACTS
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default NavbarBottom;