
interface ServiceCardProps {
    imgURL: any;
    label: string;
    subtext: string;
}

const ServiceCard = ({imgURL, label, subtext}: ServiceCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center 
        gap-2 sm:gap-6 p-2 bg-white rounded-lg shadow-sm hover:shadow-md 
        transition-shadow duration-300"
    >
      {/* Icon Container */}
      <div className="flex-shrink-0 w-14 h-14 flex 
        items-center justify-center bg-coral-red rounded-full"
    >
        <img src={imgURL} alt={label} width={28} height={28} />
      </div>
      
      {/* Text Content */}
      <div className="text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-bold 
            leading-tight font-palanquin mt-2 sm:mt-0 whitespace-nowrap">
          {label}
        </h3>
        <p className="text-sm sm:text-base font-montserrat text-slate-gray mt-1">
          {subtext}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard