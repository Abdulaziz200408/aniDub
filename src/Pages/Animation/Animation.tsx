import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import "./animation.css";

const Animation = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get("https://6d548820c3f18dbd.mokky.dev/menuAnimation")
      .then((res) => {
        const menu = res.data;
        setSlides(menu || []);
      })
      .catch((error) => {
        console.error("Error fetching slides:", error);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const slide = slides[currentSlide] || {};

  return (
    <div
      style={{
        marginLeft: "15px",
      }}
      className="flex flex-col items-center repons bg-background-filter mt-2"
    >
      <div className="relative w-full   max-w-9xl h-80 md:h-[32rem] text-white">
        <div className="relative w-full h-full">
          <img
            style={{
              borderRadius: "20px",
            }}
            src={slide.bacgroundImg}
            alt={slide.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 background_filter"></div>
        </div>
        <div className="absolute top-4 left-4 p-4 bg-gradient-to-b rounded-lg w-full md:w-[42rem]">
          <h2 className="text-xl md:text-3xl font-bold">{slide.name}</h2>
          <p
            className="text-xs md:text-sm text-clamp"
            style={{
              maxWidth: "42rem",
              lineHeight: "1.5",
            }}
          >
            {slide.desc}
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Watch Now
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 hidden md:flex">
          {slides.slice(0, 5).map((slide, index) => (
            <img
              style={{
                outline: "none",
                width: "100px",
                height: "100px",
              }}
              key={index}
              src={slide.img}
              alt={slide.name}
              className={`object-cover  rounded-lg cursor-pointer ${
                index === currentSlide ? "ring-2 ring-blue-600" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;
