import React from "react";
import { Carousel } from "react-responsive-carousel";
import data from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import css from "./CarouselEffect.module.css";
const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        interval={2000}
      >
        {data.map((image, index) => (
          <img src={image} key={index} alt={`image ${index + 1}`} />
        ))}
      </Carousel>
      <div className={css.hero__img}> </div>
    </>
  );
};

export default CarouselEffect;
