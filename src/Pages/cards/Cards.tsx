import React, { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { FaHeart } from "react-icons/fa";

interface CardData {
  id: number;
  name: string;
  desc: string;
  img: string;
  data: string;
  views: string;
  isPaid: boolean;
  eye: number;
}

const Cards: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    axios
      .get("https://6d548820c3f18dbd.mokky.dev/Cards")
      .then((response) => setCards(response.data))
      .catch((error) => console.error("Error fetching cards:", error));

    const savedLikes = localStorage.getItem("liked");
    if (savedLikes) {
      setLiked(JSON.parse(savedLikes));
    }
  }, []);

  const handleHeartClick = (id: number) => {
    const newLikedState = {
      ...liked,
      [id]: !liked[id],
    };
    setLiked(newLikedState);
    localStorage.setItem("liked", JSON.stringify(newLikedState));
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cards.map((item) => (
          <div
            key={item.id}
            className="relative shadow-lg rounded-lg overflow-hidden h-[315px] transition-transform transform"
          >
            <FaHeart
              onClick={() => handleHeartClick(item.id)}
              className={`absolute top-3 right-3 cursor-pointer transition-colors ${
                liked[item.id] ? "text-red-500" : "text-white"
              }`}
              style={{ zIndex: 10, fontSize: "20px" }} // Ensure icon is on top
            />
            <img
              style={{
                width: "100%",
                height: "70%",
              }}
              src={item.img}
              alt={item.name}
              className="cursor-pointer object-cover rounded-t-lg transition-transform duration-500 transform hover:scale-105" // Smoother zoom effect
            />
            <div className="p-4 h-[50%] flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2 truncate">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2 truncate">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TbEye className="text-blue-500 text-lg" />
                <span className="text-gray-600 text-sm">{item.eye}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
