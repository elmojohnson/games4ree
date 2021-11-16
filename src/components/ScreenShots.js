import React from "react";
import { Carousel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ScreenShots({ images }) {
  return (
    <div>
      <Carousel>
        {images.map((sc, i) => {
          return (
            <Carousel.Item key={i}>
              <LazyLoadImage
                className="d-block w-100"
                effect="blur"
                src={sc.image}
                alt={sc.id}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ScreenShots;
