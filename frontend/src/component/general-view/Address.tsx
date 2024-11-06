
const Address = () => {
    // const {showToast, user, addressList, setAddressList} = useAppContext()
    // const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);
    



    // const {mutate, isPending} = useMutation({
    //     mutationFn: generalApiClient.addAddress,
    //     onSuccess: async (responseData) => {
    //       console.log("Mutation Result:", responseData); 
    //       showToast({ message: "Address Saved!", type: "SUCCESS" });
    //     },
    
    //     onError: (error: Error) => {
    //       showToast({ message: error.message, type: "ERROR" });
    //     },
    //   });
    
    //   const handleSave = (addressFormData: FormData)=>{
    //     mutate(addressFormData)
    //   }


  return (
    <div>
        Address
    </div>
    // <Card>
    //   <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
    //     {addressList && addressList.length > 0
    //       ? addressList.map((singleAddressItem) => (
    //           <AddressCard
    //             selectedId={selectedId}
    //             handleDeleteAddress={handleDeleteAddress}
    //             addressInfo={singleAddressItem}
    //             handleEditAddress={handleEditAddress}
    //             setCurrentSelectedAddress={setCurrentSelectedAddress}
    //           />
    //         ))
    //       : null}
    //   </div>
    //   <CardHeader>
    //     <CardTitle>
    //       {currentEditedId !== null ? "Edit Address" : "Add New Address"}
    //     </CardTitle>
    //   </CardHeader>
      
    //   <CardContent className="space-y-3">
    //     <AddressForm
    //         isLoading={isPending} 
    //         onSave={handleSave} 
    //     />
    //     {/* <CommonForm
    //       formControls={addressFormControls}
    //       formData={formData}
    //       setFormData={setFormData}
    //       buttonText={currentEditedId !== null ? "Edit" : "Add"}
    //       onSubmit={handleManageAddress}
    //       isBtnDisabled={!isFormValid()}
    //     /> */}
    //   </CardContent>
    // </Card>
  )
}

export default Address