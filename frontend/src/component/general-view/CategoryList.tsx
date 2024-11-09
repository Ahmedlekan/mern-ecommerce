import * as generalApiClient from "../../apiClient/general"
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ProductsType } from "../../../../backend/src/shared/types"
import { useAppContext } from "../../contexts/AppContext"

import Slider from "react-infinite-logo-slider"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from "react-responsive";
  
const CategoryList = () => {

const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  
    const {setSelectedCategory} = useAppContext()

    const {data: categoryProduct = [], isLoading, isError} = useQuery<ProductsType[]>({
        queryKey: ["categories"],
        queryFn: generalApiClient.CategoryList
    })


    const handleCategoryClick = (category: string) => {
        setSelectedCategory([category]);
    };

    if(isError){
      return <div> No Products Found</div>
    }

  return (
    <div className='container mx-auto pt-16 p-4 bg-gray-100 
        overflow-scroll scrollbar-none'
    >

        <div className='flex items-center gap-4 justify-between'>

            {
                isLoading && isSmallScreen ? (
                    <Slider {...settings}>
                        {categoryProduct?.map((product, index)=> {
                            return(
                                <Link to={"/product-category?category="+product?.category}
                                    onClick={() => handleCategoryClick(product.category)}
                                    className='cursor-pointer' 
                                    key={index}
                                >
                                    <div className="flex flex-col items-center gap-2 bg-white rounded-lg 
                                        border border-black p-2 hover:scale-105 hover:duration-300"
                                    >
                                        <img src={product?.imageUrls[0]} 
                                            alt={product?.category} 
                                            className='h-full object-scale-down mix-blend-multiply 
                                                hover:scale-125 transition-all'
                                        />
                                        <p className='text-center text-sm md:text-base lg:text-lg
                                            font-semibold capitalize mt-2'
                                        >
                                            {product?.category}
                                        </p>
                                    </div>

                                </Link>
                            )
                        })}
                    </Slider>
                ) :
                (
                    categoryProduct?.map((product, index)=>{
                        return (
                            <Link to={"/product-category?category="+product?.category} 
                                onClick={() => handleCategoryClick(product.category)}
                                className='cursor-pointer' 
                                key={index}
                            >
                                <div className='w-16 h-16 md:w-20 md:h-20 lg:w-40 lg:h-40 
                                    rounded-full overflow-hidden p-4 bg-slate-200 
                                    flex items-center justify-center'
                                >
                                    <img src={product?.imageUrls[0]} 
                                        alt={product?.category} 
                                        className='h-full object-scale-down mix-blend-multiply 
                                            hover:scale-125 transition-all'
                                    />
                                </div>
                                <p className='text-center text-sm md:text-base lg:text-lg
                                    font-semibold capitalize mt-2'
                                >
                                        {product?.category}
                                </p>
                            </Link>
                        )
                    })
                )
            }

        </div>
    
    </div>
  )
}

export default CategoryList


{/* <div className=''>
          {isSmallScreen ? (
            <Slider {...settings}>
            {section.map((item, index)=> (
              <div key={index} className='p-3'>
                <div className='flex flex-col items-center gap-2 bg-white rounded-lg 
                  border border-black p-2 hover:scale-105 hover:duration-300'
                >
                  <p className='text-sm font-medium text-center'>{item.title}</p>
                  <Image src={item.image} 
                    alt='item img' 
                    width={200} 
                    height={150} 
                    className='w-[250px] h-[200px] rounded-lg object-contain'
                  />
                </div>
              </div>
            ))}
          </Slider>
          ):(
            <Slider {...settings}>
            {section.map((item, index)=> (
              <div key={index} className='p-3'>
                <div className='flex flex-col items-center gap-5 bg-white rounded-lg 
                  border border-black p-2 hover:scale-105 hover:duration-300'
                >
                  <p className='sm:text-sm md:text-lg font-medium text-center'>{item.title}</p>
                  <Image src={item.image} 
                    alt='item img' 
                    width={300} 
                    height={250} 
                    className='w-[300px] h-[220px] rounded-lg object-contain'
                  />
                </div>
              </div>
            ))}
          </Slider>
          )}
        </div> */}