import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import logo from "../imgs/aniDub_logo.png"; // Import local logo image
import bars from "../imgs/bars.png";
import user from "../imgs/user.png";
import { toast, ToastContainer } from "react-toastify";
import "./menu.css";
import { RiSearchLine } from "react-icons/ri";
import { Modal, Button } from "antd";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    localStorage.removeItem("password");
    localStorage.removeItem("profileImg"); // Remove profileImg as well
    setIsLoggedIn(false);
    setOpenProfileModal(false);
    window.location.reload();
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");
    const storedPassword = localStorage.getItem("password");

    if (storedName && storedPhone && storedPassword) {
      setName(storedName);
      setPhone(storedPhone);
      setPassword(storedPassword);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignUp = () => {
    if (name.length > 4 && phone.trim() !== "" && password.trim() !== "") {
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
      localStorage.setItem("password", password);

      setIsLoggedIn(true);
      setOpenSignModal(false);
    } else {
      toast.error(
        "Iltimos, barcha maydonlarni to'ldiring va ismingizni 4 harfdan ko'proq kiriting."
      );
    }
    window.location.reload();
    setName("");
    setPhone("");
    setPassword("");
    setRepeatPassword("");
  };

  const openSignUpModal = () => setOpenSignModal(true);
  const closeSignUpModal = () => setOpenSignModal(false);

  const openProfile = () => setOpenProfileModal(true);
  const closeProfile = () => setOpenProfileModal(false);

  const goToProfile = () => {
    closeProfile();
    navigate("/profil");
  };

  // Get profile image from localStorage or fallback to default logo
  const profilImg = localStorage.getItem("profileImg") || user;

  return (
    <nav className="">
      <div className="px-4">
        <div className="respons flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              onClick={() => navigate("/Menu")}
              className="w-32 cursor-pointer"
              src={logo} // Use local logo image
              alt="Logo"
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative flex gap-10 items-center">
              <RiSearchLine
                className="text-teal-500 text-2xl cursor-pointer transition-transform hover:scale-105"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            {!isLoggedIn ? (
              <button
                style={{
                  backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  width: "140px",
                }}
                onClick={openSignUpModal}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
              >
                Kirish
                <TbLogin2 className="text-xl" />
              </button>
            ) : (
              <button
                onClick={openProfile}
                className="flex profilButton"
              >
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  src={profilImg}
                  alt="Profile"
                />
              </button>
            )}
          </div>
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className="w-10 h-10" src={bars} alt="Menu" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg_fg_flter z-30 w-64 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transition: "transform 0.3s ease-out" }}
      >
        <div className="p-4">
          {!isLoggedIn ? (
            <button
              className="w-full px-4 py-2 text-white shadow-lg hover:bg-teal-600 transition-colors relative overflow-hidden"
              onClick={openSignUpModal}
              style={{
                backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "30px",
              }}
            >
              <div className="absolute inset-0 transition-transform transform scale-100 hover:scale-110" />
              Kirish
            </button>
          ) : (
            <button
              onClick={openProfile}
              className="w-full px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition-colors"
            >
              <img
                className="w-5 h-5 inline-block mr-2"
                src={profilImg}
                alt="Profile"
              />
              Profil
            </button>
          )}
        </div>
      </div>

      {/* Sign Up/Login Modal */}
      <Modal
        className="custom-modal"
        open={openSignModal}
        onCancel={closeSignUpModal}
        footer={null}
        closeIcon={
          <IoClose
            style={{
              color: "#00F0FF",
            }}
          />
        }
      >
        <div>
          {/* modal header */}
          <div className="modalHeader">
            <h1
              style={{
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  color: "#00F0FF",
                }}
              >
                Ro’
              </span>
              yxatdan o’tish
            </h1>
          </div>

          {/* modal body */}
          <div className="modalBody">
            <img
              className=""
              src="https://i.pinimg.com/736x/98/b2/d5/98b2d566669ba22380a40071cf06ce21.jpg"
              alt=""
            />
          </div>

          {/* inputs */}
          <div className="inputs">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Isminggizni kiriting...."
            />
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Parolni kiriting...."
            />
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Parolni takrorlang..."
            />
          </div>

          {/* action buttons */}
          <div className="flex flex-col items-center">
            <Button
              onClick={handleSignUp}
              className="bg-gradient-to-r w-full from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-teal-600 transition-colors"
            >
              Ro’yxatdan o’tish
            </Button>
          </div>
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal
        className="modal_style"
        open={openProfileModal}
        onCancel={closeProfile}
        footer={null}
        closeIcon={
          <IoClose
            style={{
              color: "#00F0FF",
            }}
          />
        }
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">{name}</h1>
          <hr className="my-4 border-gray-300" />
          <button
            className="flex items-center gap-2 py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={goToProfile}
          >
            <FaUser className="text-white" />
            <p>Profilga kirish</p>
          </button>
          <button
            className="flex items-center gap-2 py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mt-2"
            onClick={handleLogout}
          >
            <FaUserSlash className="text-white" />
            <p>Chiqish</p>
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
