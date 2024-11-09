import ReviewCard from "../ui/ReviewCard"
import customer1 from "../../assets/images/customer1.jpeg"
import customer2 from "../../assets/images/customer2.svg"

const reviews = [
  {
      imgURL: customer1,
      customerName: 'Morich Brown',
      rating: 4.5,
      feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
  },
  {
      imgURL: customer2,
      customerName: 'Lota Mongeskar',
      rating: 4.5,
      feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
  },
  {
      imgURL: customer1,
      customerName: 'Morich Brown',
      rating: 4.5,
      feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
  },
  {
      imgURL: customer2,
      customerName: 'Lota Mongeskar',
      rating: 4.5,
      feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
  },
];

const CustomerReviews = () => {
  return (
    <section className="container px-4 py-10">
      <h3 className="font-bold font-palanquin
        text-center text-3xl md:text-4xl"
      > 
        What Our <span className="text-coral-red"> Customers </span> Says? 
      </h3>
      <p className="mt-4 md:text-xl font-montserrat 
          text-slate-gray m-auto max-w-lg text-center">Hear genuine stories 
        from our satisfied customers about their exception experience with us
      </p>

      <div className="container mx-auto p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map( review =>(
            <div key={review.customerName}>
              <ReviewCard {...review} />
            </div>
          ) )}
        </div>
      </div>

    </section>
  )
}

export default CustomerReviews