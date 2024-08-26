import React, { useState, useEffect } from "react";
import axios from "axios";
import "../newsCard/newcard.css";
import { message } from "antd";
import { AiFillLeftCircle } from "react-icons/ai";
import { FaCircleChevronRight } from "react-icons/fa6";
import { TbEye } from "react-icons/tb";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import "../../App.css";

interface SliderItem {
  id: number;
  img: string;
  eye: string;
  name: string;
  new: string;
}

const NewsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderData, setSliderData] = useState<SliderItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

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

  const visibleSliderData = sliderData.slice(
    currentIndex,
    currentIndex + visibleCards
  );

  return (
    <div className="news-card-container flex justify-center mt-10">
      <div className="container">
        {contextHolder}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            YANGI MAVSUM - Animelar
          </h2>
          <div className="flex items-center gap-4">
            <AiFillLeftCircle
              className="text-blue-400 cursor-pointer hover:text-blue-600 transition-transform duration-300"
              onClick={handlePrev}
              size={31}
            />
            <FaCircleChevronRight
              className="text-blue-400 cursor-pointer hover:text-blue-600 transition-transform duration-300"
              onClick={handleNext}
              size={26}
            />
          </div>
        </div>
        <div className="border"></div>
        {/* Slider */}
        <div className="slider-container flex overflow-x-auto py-4">
          {visibleSliderData.map((item, index) => (
            <div
              key={item.id}
              className="slider-card relative mx-2 transition-transform duration-500 hover:scale-105"
            >
              <div className="shadow-lg overflow-hidden rounded-lg">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                />
                <div className="card-body-news p-4">
                  <h2 className="text-lg font-semibold mb-2 truncate">
                    {item.name}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <div
                      style={{
                        gap: "70px",
                      }}
                      className="flex items-center"
                    >
                      <div className="flex items-center text-sm text-gray-500">
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
        <div className="border mt-5"></div>
      </div>
    </div>
  );
};

export default NewsCard;
