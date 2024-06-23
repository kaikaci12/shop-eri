import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

import { useState, useEffect } from "react";
const slides = [
  {
    url: "https://img.freepik.com/free-psd/11-11-flash-sale-youtube-banner-template_23-2150826890.jpg?w=1380&t=st=1717590457~exp=1717591057~hmac=a037c99a19ffc7d0f4d26ff7e8015579d06645269ffbdfa17e3cea0833cc2ad1",
  },
  {
    url: "https://img.freepik.com/free-psd/11-11-flash-sale-landing-page-template_23-2150826876.jpg?t=st=1717590457~exp=1717591057~hmac=6791023d67c13d80cf479d2187448800df696b502e1cd7a9f6a7953f2e42bcf6",
  },
  {
    url: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/b07ca844b7801980237405529930186a.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  function prevSlide() {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }
  const nextSlide = () => {
    const isLast = currentIndex === slides.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  function goToSlide(slideIndex: number) {
    setCurrentIndex(slideIndex);
  }
  return (
    <div className=" flex flex-col relative  justify-center items-center h-[300px] md:h-[350px] lg:h-[400px]  w-full    group">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})
        
        `,
          transition: "ease-in-out 0.5s",
        }}
        className="h-full max-w-[1200px] w-full rounded-xl   bg-center  bg-cover duration-500"
      ></div>
      <div
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] translate-x-0 traslate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer "
      >
        <BsChevronCompactLeft size={30} />
      </div>
      <div
        onClick={nextSlide}
        className=" hidden group-hover:block  absolute top-[50%] translate-x-0 traslate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer "
      >
        <BsChevronCompactRight size={30} />
      </div>
      <div className="flex top-4 justify-center py-2 gap-[10px]">
        {slides.map((_, index) => {
          return (
            <div
              onClick={() => goToSlide(index)}
              key={index}
              className={`rounded-lg   `}
            >
              <div
                className={`w-[10px] h-[10px] cursor-pointer rounded-lg bg-gray-500 ${
                  index === currentIndex ? "bg-gray-700" : ""
                } border-solid `}
              ></div>
              {/* <RxDotFilled /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
