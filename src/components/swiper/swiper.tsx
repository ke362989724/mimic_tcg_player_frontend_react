import React from "react";
import Slider from "react-slick";
import testing from "../../../public/testing.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageList = [
  "../../../public/testing.jpg",
  "../../../public/testing.jpg",
  "../../../public/testing.jpg",
  "../../../public/testing.jpg",
  "../../../public/testing.jpg",
  "../../../public/testing.jpg",
];

type Props = {};
const SwiperComponent = (props: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <div>Hello World</div>
      <div>Hello World</div>
      <div>Hello World</div>
      {/* {imageList.map((image, index) => (
          <div key={index} className="h-full w-full">
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))} */}
    </Slider>
  );
};

export default SwiperComponent;
