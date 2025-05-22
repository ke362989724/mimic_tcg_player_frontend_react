import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

const imageList = [
  "/testing_1.jpeg",
  "/testing_2.jpeg",
  "/testing_3.jpeg",
  "/testing_1.jpeg",
  "/testing_2.jpeg",
  "/testing_3.jpeg",
];

const SwiperComponent = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log("activeIndex", activeIndex);

  const handleNextSlide = () => {
    console.log("swiperRef", swiperRef.current?.swiper.isEnd);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  console.log("imageList", imageList.length);

  return (
    <div
      className="relative rounded-md border-2 bg-cover bg-center"
      style={{
        backgroundImage: `url("/testing.jpg")`,
      }}
    >
      <div className="absolute h-full w-full backdrop-blur-3xl"></div>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerGroup={1}
        loop={false}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className="relative [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:outline-2 [&_.swiper-pagination-bullet-active]:outline-amber-600" // Added relative here
        ref={swiperRef}
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index} className="">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-[400px] w-full object-cover"
            />
          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        <div className="testing absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-4">
          <div
            className={cn("cursor-pointer rounded-full bg-white p-3", {
              "opacity-50": swiperRef.current?.swiper.isBeginning,
            })}
            onClick={handlePrevSlide}
          >
            <FaArrowLeft size={25} />
          </div>
          <div
            className={cn("cursor-pointer rounded-full bg-white p-3", {
              "opacity-50": swiperRef.current?.swiper.isEnd,
            })}
            onClick={handleNextSlide}
          >
            <FaArrowRight size={25} />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
