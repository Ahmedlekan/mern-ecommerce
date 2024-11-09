import camera1 from "../../assets/images/camera1.jpg"

const SuperQuality = () => {
  return (
    <div className=" pt-10 flex justify-between items-center 
      max-lg:flex-col container px-4 gap-8"
    >
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="font-palaquin text-3xl md:text-4xl 
          font-bold capitalize lg:max-w-2xl"
        >
          We privide you <span className="text-coral-red">super </span>
          <span className="text-coral-red">Quality</span> products
        </h2>
        <p className="mt-4 text-base md:text-xl font-montserrat 
          text-slate-gray">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Iste inventore illo dolorum laudantium voluptatum modi, 
          ex consequuntur atque eaque expedita! Eveniet consequatur 
          consectetur molestias consequuntur
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Iste inventore illo dolorum laudantium voluptatum modi, 
          ex consequuntur atque eaque expedita! Eveniet consequatur 
          consectetur molestias consequuntur
        </p>
        <p className="lg:max-w-2xl text-base md:text-xl lg:text-2xl font-montserrat 
          text-slate-gray">
          Our dedication to detail and excelence ensures your satisfaction
        </p>
      </div>

      <div className="flex flex-1 justify-end items-center">
        <img src={camera1} width={550} height={500} alt="camera" className="object-contain" />
      </div>

    </div>
  )
}

export default SuperQuality