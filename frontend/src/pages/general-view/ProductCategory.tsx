import React, {useState} from 'react'
import ProductCard from '../../component/general-view/ProductCard'
import * as generalApiclient from "../../apiClient/general"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from '../../component/ui/Skeleton'
import CategoryFilter from '../../component/ui/CategoryFilter'
import BrandFilter from '../../component/ui/BrandFilter'
import PriceFilter from '../../component/ui/PriceFilter'
import Pagination from '../../component/ui/Pagination'
import { useAppContext } from '../../contexts/AppContext'
import { ProductsType } from '../../../../backend/src/shared/types'

const ProductCategory = () => {
    const {title, setTitle, selectedCategory, setSelectedCategory} = useAppContext()

    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1)
    const [sortOption, setSortOption] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

     //taking what the user search into our searchproducts
  const searchParams = {
    title: title,
    page: page.toString(),
    category: selectedCategory,
    brand: selectedBrand,
    maxPrice: selectedPrice?.toString(),
    sortOption
  }

    const {data: product, isLoading, isError} = useQuery({
        queryKey:["searchProducts", searchParams],
        queryFn: ()=> generalApiclient.searchProducts(searchParams)
      })

    if (isLoading){
        return <Skeleton />
    }
    if (isError || !product) return <p>No Products Found</p>;


    // adding and removing the type and unchecked type
const categoryTypesChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const categoryType = event.target.value

    setSelectedCategory((prevTypes) =>
        event.target.checked
        ? [...prevTypes, categoryType]
        : prevTypes.filter((type)=> type !== categoryType)
    )
}

    // adding and removing the type and unchecked type
  const BrandTypesChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const brandType = event.target.value

    setSelectedBrand( (prevTypes) =>
        event.target.checked
        ? [...prevTypes, brandType]
        : prevTypes.filter((type)=> type !== brandType)
    )
    }

    const handleResetFilters = () => {
        setSelectedCategory([]);
        setSelectedBrand([]);
        setSelectedPrice(undefined);
        setSortOption("");
        setPage(1);
        setTitle("")
      };

  return (
    <div className="container px-4 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        
        {/* filter */}
        <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter By:
                </h3>
                
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onChange={categoryTypesChange}
                />
                <BrandFilter
                    selectedBrand={selectedBrand}
                    onChange={BrandTypesChange}
                />

                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value?:number)=> setSelectedPrice(value)}
                />
            </div>
        </div>

        <div className="flex flex-col gap-5">
            
            <div className="flex justify-between items-center">

                <button onClick={handleResetFilters}>Reset Filters</button>

                <span className='text-xl font-bold'>
                    {product.pagination.total} Products found
                </span>

                <select 
                    className="p-2 border rounded-md"
                    value={sortOption}
                    onChange={(event)=>setSortOption(event.target.value) }
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">
                        Price (low to high)
                    </option>
                    <option value="priceDesc">
                        Price (high to low)
                    </option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {product.data.map((product: ProductsType) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            <div>
            <Pagination
                page={product?.pagination.page || 1}
                pages={product?.pagination.pages || 1}
                onPageChange={(page)=> setPage(page)}
            />
            </div>

        </div>

    </div>
  )
}

export default ProductCategory