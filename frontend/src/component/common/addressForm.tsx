// import { useForm, FormProvider } from 'react-hook-form';
// import Button from '../ui/Button';
// import AddressFormInput from '../general-view/AddressFormInpit';


// export type AddressFormDataInput = {
//   address: string;
//   city: string;
//   pincode: string;
//   phone: string;
//   notes: string;
// };

// type AddressFormProps = {
//   onSave: (addressFormData: FormData) => void;
//   isLoading: boolean;
// };

// export const AddressForm = ({onSave, isLoading}: AddressFormProps) => {
  
//   const formMethods = useForm<AddressFormDataInput>()
    
//   const {handleSubmit} = formMethods


//   const onSubmit = handleSubmit((formDataJson : AddressFormDataInput)=> {
//     const formData = new FormData()

//     formData.append("address", formDataJson.address);
//     formData.append("city", formDataJson.city);
//     formData.append("notes", formDataJson.notes);
//     formData.append("phone", formDataJson.phone);
//     formData.append("pincode", formDataJson.pincode);

//     onSave(formData)
//   })

//   return (
//     <FormProvider {...formMethods}>

//       <div className="w-full h-full"
//       >
//             <h2 className='font-bold text-lg'>Add New Address</h2>

//           <form onSubmit={onSubmit}>
//             <div className="flex flex-col gap-3 mt-10">
//               <AddressFormInput />
//             </div>

//             <Button disabled={isLoading} type="submit" className="mt-2 w-full">
//               {isLoading ? "Submitting..." : "Submit"}
//             </Button>
            
//           </form>

//       </div>
    
//     </FormProvider>
//   );
// };