
const Subscribe = () => {
  return (
    <section className=" container flex justify-between px-4 
      items-center max-lg:flex-col bg-gray-100 py-10"
    >
      <h3 className="text-3xl md:text-4xl md:leading-[68px] 
        font-palanquin font-bold lg:max-w-md"
      >
        Sign Up for <span className="text-coral-red">Updates</span> & Newsletter
      </h3>
      <div className="w-full lg:max-w-[40%] flex items-center 
        max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full"
      >
        <input type="text" placeholder="Subscribe@nikey.com" className="input" />
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
        
          <button
          className="flex justify-center items-center gap-2 px-7 py-4 
            border font-montserrat text-lg leading-nonenbg-coral-red font-semibold 
            text-white border-coral-red bg-coral-red rounded-full w-full"
        >
          Sign Up
        </button>
    
        </div>
      </div>
    </section>
  )
}

export default Subscribe