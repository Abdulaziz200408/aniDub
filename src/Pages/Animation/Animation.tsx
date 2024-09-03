import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "../Menu/Layout";
import '../Animation/animation.css';

interface Slide {
  bacgroundImg: string;
  name: string;
  desc: string;
}

const Animation: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

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
    return <div className="text-center text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="relative w-full h-[40vh] md:h-[77vh] overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image ustiga qo'shimcha qorong'ilik effekti */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.bacgroundImg})`,
              zIndex: "-1",
            }}
          ></div>

          {/* Qorong'ilik effekti qo'shilgan overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{ zIndex: "-1" }}
          ></div>

          <div className="absolute flex items-center mt-20 justify-around w-full">
            <div className="p-4 md:p-8 text-center md:text-left text-white max-w-md md:max-w-xl">
              <h1 className="text-xl md:text-4xl font-bold">{slide.name}</h1>
              <p className="mt-2 subttile md:mt-4 text-sm md:text-lg">{slide.desc}</p>
              <button className="mt-4 md:mt-6 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg">
                Ko'rish
              </button>
            </div>

            <div className="mt-4 md:mt-0 relative w-24 h-24 md:w-40 md:h-40 lg:w-56 lg:h-56">
              <img
                src={slide.bacgroundImg}
                alt={slide.name}
                className="w-full h-full object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === currentSlide
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Animation;
