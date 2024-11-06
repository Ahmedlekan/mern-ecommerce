import ServiceCard from "../ui/ServiceCard"
import truckFast from "../../assets/icons/truck-fast.svg"
import shieldTick from "../../assets/icons/shield-tick.svg"
import  support from "../../assets/icons/support.svg"


const services = [
  {
      imgURL: truckFast,
      label: "Free Shipping",
      subtext: "From all orders over $100."
  },
  {
      imgURL: shieldTick,
      label: "Daily Offers",
      subtext: "Save up to 25% off."
  },
  {
      imgURL: support,
      label: "Love to help you",
      subtext: "Shop with an expert."
  },
  
  {
      imgURL: support,
      label: "Secure Payments",
      subtext: "100% protected payment"
  },
];

const Services = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 
      sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 py-10 px-4"
    >

      {services.map( service =>(
        <div key={service.label}>
          <ServiceCard {...service} />
        </div>
      ) )}
    </div>
  )
}

export default Services