import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
import instagram from "../assets/icons/instagram.svg";



export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Airpods", link: "/" },
            { name: "Camera", link: "/" },
            { name: "Processor", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Mouse", link: "/" },
            { name: "Watches", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@diplo.com", link: "mailto:customer@diplo.com" },
            { name: "+1 438-994-4504", link: "+1 438-994-4504" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];


  export const category = {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id : 1, label : "Airpodes"},
      { id : 2, label : "Camera"},
      { id : 3, label : "Earphones"},
      { id : 4, label : "Mouse"},
      { id : 5, label : "Processor"},
      { id : 6, label : "Speakers"},
      { id : 7, label : "Trimmers"},
      { id : 8, label : "Watches"},
    ],
  }

  export const brand = {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "sansisk", label: "Sansisk" },
      { id: "dell", label: "Dell" },
      { id: "canon", label: "Canon" },
      { id: "intel", label: "Intel" },
    ],
  }


  