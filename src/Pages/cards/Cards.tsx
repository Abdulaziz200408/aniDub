import React, { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../cards/css.css";

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
  const [balans, setBalans] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6d548820c3f18dbd.mokky.dev/Cards"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();

    const savedLikes = localStorage.getItem("liked");
    if (savedLikes) {
      setLiked(JSON.parse(savedLikes));
    }
  }, []);

  const paid = (id: number) => {
    if (balans <= 0) {
      toast.error("Iltimos, balansingizni to'ldiring!");
    } else {
      toast.success("To'lov muvaffaqiyatli amalga oshirildi!");
    }
  };

  const eyeCount = async (id: number) => {
    try {
      const card = cards.find((card) => card.id === id);
      if (card) {
        const updatedEyeCount = card.eye + 1;

        const updatedCards = cards.map((c) =>
          c.id === id ? { ...c, eye: updatedEyeCount } : c
        );
        setCards(updatedCards);

        await axios.patch(`https://6d548820c3f18dbd.mokky.dev/Cards/${id}`, {
          eye: updatedEyeCount,
        });
      }
    } catch (error) {
      console.error("Error updating eye count:", error);
    }
  };

  const name = localStorage.getItem("name");

  const handleHeartClick = (id: number) => {
    if (name) {
      const newLikedState = {
        ...liked,
        [id]: !liked[id],
      };
      setLiked(newLikedState);
      localStorage.setItem("liked", JSON.stringify(newLikedState));
    } else {
      toast.error("Iltimos, ro'yxatdan o'ting!");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cards.map((item) => (
          <div onClick={() => eyeCount(item.id)} key={item.id} className="card">
            <FaHeart
              onClick={(e) => {
                e.stopPropagation(); // To prevent card click event when heart icon is clicked
                handleHeartClick(item.id);
              }}
              className={`icon ${
                liked[item.id] && name ? "text-red-500" : "text-white"
              } cursor-pointer`}
            />
            <img
              src={item.img}
              alt={item.name}
              onError={(e) =>
                (e.currentTarget.src = "/path/to/fallback-image.jpg")
              }
            />
            <div className="card-content">
              <div>
                <h2 className="text-lg font-semibold mb-2 truncate">
                  {item.name}
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TbEye className="text-blue-500 text-lg" />
                    <span className="text-gray-600 text-sm">{item.eye}</span>
                  </div>
                  {item.isPaid ? (
                    <button onClick={() => paid(item.id)} className="money">
                      Pullik
                    </button>
                  ) : (
                    <p className="card_subttile">{item.desc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border"></div>
      <ToastContainer />
    </div>
  );
};

export default Cards;
