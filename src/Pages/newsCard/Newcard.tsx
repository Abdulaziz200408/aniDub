import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../newsCard/newcard.css";
import { message } from "antd";
import { TbEye } from "react-icons/tb";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import "../../App.css";

interface SliderItem {
  id: number;
  img: string;
  eye: string;
  name: string;
  new: string;
  data: string;
}

const NewsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderData, setSliderData] = useState<SliderItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios
      .get("https://6d548820c3f18dbd.mokky.dev/news_card")
      .then((res) => {
        setSliderData(res.data);
      })
      .catch(() => {
        showError("Slayder maʼlumotlarini olishda xatolik yuz berdi");
      });
  }, []);

  const showError = (errorMsg: string) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
      style: {
        marginTop: "10px",
        marginRight: "10px",
        textAlign: "right",
      },
    });
  };

  const totalCards = sliderData.length;
  const visibleCards = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [totalCards]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalCards - visibleCards ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - visibleCards : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    sliderRef.current!.setAttribute("data-touch-start", touchStartX.toString());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const touchStartX = parseFloat(sliderRef.current.getAttribute("data-touch-start") || "0");
    const touchCurrentX = e.touches[0].clientX;

    if (touchStartX - touchCurrentX > 50) {
      handleNext();
      sliderRef.current.removeAttribute("data-touch-start");
    } else if (touchStartX - touchCurrentX < -50) {
      handlePrev();
      sliderRef.current.removeAttribute("data-touch-start");
    }
  };

  const visibleSliderData = sliderData.slice(
    currentIndex,
    currentIndex + visibleCards
  );

  return (
    <div className="news-card-container flex justify-center">
      <div className="container">
        {contextHolder}
        <div className="flex items-center justify-between"></div>
        <div className="border"></div>
        {/* Slider */}
        <div
          ref={sliderRef}
          className="slider-container flex py-4 mt-4 overflow-x-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {visibleSliderData.map((item) => (
            <div
              key={item.id}
              className="slider-card relative mx-2 transition-transform duration-500 hover:scale-105 w-64"
            >
              <button className="podf">{item.data}</button>
              <div className="shadow-lg overflow-hidden rounded-lg">
                <img
                  src={item.img}
                  alt={item.name}
                  className="slider-img w-full h-72 object-cover rounded-t-lg cursor-pointer"
                />
                <div className="card-body-news p-4">
                  <h2 className="text-lg font-semibold mt-3 truncate">
                    {item.name}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <div
                      style={{
                        gap: "70px",
                      }}
                      className="flex items-center"
                    >
                      <div className="flex items-center text-sm text-gray-500 ">
                        <TbEye className="text-blue-500 mr-1" />
                        <span>{item.eye}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <SiGoogledisplayandvideo360 className="text-blue-500 mr-1" />
                        <span>{item.new}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "5px",
          }}
          className="border"
        ></div>
      </div>
    </div>
  );
};

export default NewsCard;
