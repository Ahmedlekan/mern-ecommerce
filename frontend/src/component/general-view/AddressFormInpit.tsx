
// import { useFormContext } from 'react-hook-form'
// // import { AddressForm } from '../common/addressForm'

// const AddressFormInput = () => {

//     const {register, formState:{errors}} = useFormContext<AddressFormData>()

//   return (
//     <div className='flex flex-col gap-4'>
//         <label className="text-gray-700 text-lg font-bold">
//             Address
//             <input
//             type="text"
//             placeholder='Address'
//             className="flex h-10 w-full rounded-md border border-input 
//                 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
//                 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
//             {...register("address", { required: "This field is required" })}
//             ></input>
//             {errors.address && (
//             <span className="text-red-500">{errors.address.message}</span>
//             )}
//         </label>
        
//         <label className="text-gray-700 text-lg font-bold">
//             City
//             <input
//             type="text"
//             placeholder='City'
//             className="flex h-10 w-full rounded-md border border-input 
//                 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
//                 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
//             {...register("city", { required: "This field is required" })}
//             ></input>
//             {errors.city && (
//             <span className="text-red-500">{errors.city.message}</span>
//             )}
//         </label>
        
//         <label className="text-gray-700 text-lg font-bold">
//             Pincode
//             <input
//             type="text"
//             placeholder='Pincode'
//             className="flex h-10 w-full rounded-md border border-input 
//                 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
//                 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
//             {...register("pincode", { required: "This field is required" })}
//             ></input>
//             {errors.pincode && (
//             <span className="text-red-500">{errors.pincode.message}</span>
//             )}
//         </label>
        
//         <label className="text-gray-700 text-lg font-bold">
//             Phone
//             <input
//             type="text"
//             placeholder='Phone'
//             className="flex h-10 w-full rounded-md border border-input 
//                 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
//                 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
//             {...register("pincode", { required: "This field is required" })}
//             ></input>
//             {errors.phone && (
//             <span className="text-red-500">{errors.phone.message}</span>
//             )}
//         </label>

//         <label className="text-gray-700 text-lg font-bold flex-1">
//           Notes
//           <textarea
//             placeholder='Notes'
//             className="flex min-h-[80px] w-full rounded-md border border-input 
//               px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 
//               focus-visible:ring-offset-2 disabled:cursor-not-allowed 
//               disabled:opacity-50 my-2"
//             {...register("notes", { required: "This field is required" })}
//           ></textarea>
//           {errors.notes && (
//             <span className="text-red-500">{errors.notes.message}</span>
//           )}
//       </label>

//       <button type="submit">Submit</button>

//       {/* <Button disabled={isLoading} type="submit" className="mt-2 w-full">
//               {isLoading ? "Submitting..." : "Submit"}
//             </Button> */}
//     </div>
//   )
// }

// export default AddressFormInput