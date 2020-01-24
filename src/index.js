// SCSS bundling
import "./main.scss";

// JavaScript bundling
import CarouselTestimonials from "./javascript/components/carousel-testimonials";

const carouselTestimonials = new CarouselTestimonials(
  "#carousel-testimonials-1",
  ".carousel-testimonials__slider",
  ".carousel-testimonials__item",
  ".btn-carousel--previous",
  ".btn-carousel--next",
  0
);

carouselTestimonials.start();
