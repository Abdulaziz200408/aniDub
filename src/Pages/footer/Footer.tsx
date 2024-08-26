import React from "react";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaPhoneFlip, FaSquareInstagram } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";

const App04 = () => {
  return (
    <div className="bg-white text-black p-8">
      <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold ">Bizni kuzatib boring</h2>
          <div className="flex items-center gap-5 justify-center">
            <FaTelegram className="text-blue-500 text-2xl" />
            <FaSquareInstagram className="text-blue-500 text-2xl" />
            <FaYoutube className="text-blue-500 text-2xl" />
          </div>
          <img
            src="https://img.telemetr.io/c/2gsixE/5319082134855604076?ty=l"
            alt=""
            className="w-44 h-52 object-cover rounded"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <IoLocation className="text-xl text-blue-500" />
            <p className="text-lg">Toshkent</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Foydali havolalar</h3>
            <a href="#" className="text-blue-500 hover:underline"></a>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Kategoriyalar
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Ongoinng
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Fantastika
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Jangari
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 gap-10 p-20">
          <h3 className="font-semibold">Kontaklar</h3>
          <h3 className="font-semibold">+93 311 50 47</h3>
          <h3 className="font-semibold">+88 011 55 05</h3>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <FaPhoneFlip className="text-blue-500 text-xl" />
            <p className="text-lg">+93 311 50 47</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Obuna bo'ling</h3>
            <p className="text-sm leading-relaxed">
              Saytda chop etilgan har qanday materiallarga bo'lgan barcha
              huquqlar O'zbekiston va xalqaro mualliflik huquqi va turtosh
              huquqlar to'g'risidagi qonun hujjatlariga muvofiq himoyalangan.
              Matn, fotosurat, audio va video materiallardan har qanday
              foydalanish faqat mualliflik huquqi egasining roziligi bilan
              mumkin...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App04;
