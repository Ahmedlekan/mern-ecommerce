declare module "react-infinite-logo-slider" {
    import { FC, ReactNode } from "react";
  
    // Define props for the Slider component
    interface SliderProps {
      width?: string;  // for width like '200px'
      duration?: number;  // duration in seconds
      autoplay?: boolean;  // autoplay functionality
      loop?: boolean;  // loop the slider
      direction?: "left" | "right";  // direction of sliding
      children?: ReactNode;  // Slider component can accept children like Slide components
    }
  
    // Define props for the Slide component
    interface SlideProps {
      children?: ReactNode;  // Slide component renders children, typically image or other content
    }
  
    // Slider component that accepts SliderProps
    interface SliderComponent extends FC<SliderProps> {
      Slide: FC<SlideProps>;
    }
  
    const Slider: SliderComponent;
  
    export default Slider;
  }