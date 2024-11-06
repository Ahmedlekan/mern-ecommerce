import BlogCard from '../ui/BlogCard'
import blog1 from "../../assets/images/blog1.jpg"
import blog2 from "../../assets/images/blog2.jpg"
import blog3 from "../../assets/images/blog3.jpg"
import blog4 from "../../assets/images/blog4.jpg"

const blogs = [
  {
    image: blog1,
    date: 'July 4, 2024',
    title: 'Product 1',
    description: 'This is a brief description of Product 1.',
  },
  {
    image: blog2,
    date: 'July 5, 2024',
    title: 'Product 2',
    description: 'This is a brief description of Product 2.',
  },
  {
    image: blog3,
    date: 'July 6, 2024',
    title: 'Product 3',
    description: 'This is a brief description of Product 3.',
  },
  {
    image: blog4,
    date: 'July 7, 2024',
    title: 'Product 4',
    description: 'This is a brief description of Product 4.',
  },
];

const Blog = () => {
  return (
    <div className=' container pt-10 px-4'>
        <h3 className="text-3xl md:text-4xl font-palanquin font-bold">
            Our <span className="text-coral-red">Latest</span> News
        </h3>

        <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((product, index) => (
          <BlogCard
            key={index}
            image={product.image}
            date={product.date}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Blog