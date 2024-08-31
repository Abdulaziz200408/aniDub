import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Input } from 'antd';
import { IoHome, IoSendSharp } from 'react-icons/io5';
import { FaPaperclip, FaSmile, FaCamera } from 'react-icons/fa';
import '../filter/section_filter.css';
import kirish from "../imgs/kiirsh.png";
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: string; // Added to track who sent the message
  timestamp: string;
}

const Filter: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [datamessage, setdatamessage] = useState<Message[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loggedInUser = localStorage.getItem('name'); // Use this to determine message alignment

  useEffect(() => {
    const email = localStorage.getItem('name');
    const password = localStorage.getItem('password');

    if (email && password) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = () => {
      axios.get("https://7dcbce21f2149e98.mokky.dev/api")
        .then((response) => {
          setdatamessage(response.data);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    };

    fetchMessages();

    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [datamessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() && loggedInUser) {
      const newMessage: Omit<Message, "id"> = {
        text: message,
        sender: loggedInUser, // Use the logged-in user as the sender
        timestamp: new Date().toLocaleTimeString(),
      };

      axios.post("https://7dcbce21f2149e98.mokky.dev/api", newMessage)
        .then(response => {
          setdatamessage([...datamessage, { ...newMessage, id: response.data.id }]);
          setMessage('');
        })
        .catch(error => {
          console.error('There was an error sending the message:', error);
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto mt-10 p-0">
      <div className="button-group">
        <div className="flex items-center gap-3">
          <button className="filter-button">Hamma anemelar</button>
          <button onClick={() => setOpen(true)} className="filter-button">Anime chat</button>
          <button className="filter-button">Anime edit</button>
        </div>
        <div>
          <button className="filter-button">Barchasi</button>
        </div>
      </div>
      <Drawer
        placement="left"
        width={950}
        open={open}
        onClose={() => setOpen(false)}
      >
        {isRegistered ? (
          <div className="modalHeader flex gap-5">
            <div className="modal_leftHeader">
              <button className="mt-4">
                <img
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                  }}
                  src="https://i.pinimg.com/564x/76/34/48/76344824fd1a24149ec6adddefc89778.jpg"
                  alt="Profile"
                />
              </button>
              <div
                className="icon_hover"
                style={{
                  width: '100%',
                  height: '10%',
                  backgroundColor: 'red',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  color: 'white',
                  marginTop: '50px',
                }}
              >
                <IoHome
                  style={{
                    fontSize: '24px',
                    marginLeft: '20px',
                  }}
                />
              </div>
            </div>
            <div className="modalBody w-full mb-2">
              <div
                style={{
                  padding: '10px',
                  width: '100%',
                  height: '660px',
                  borderRadius: '10px',
                  position: 'relative',
                  backgroundColor: '#F0F0F0',
                  overflow: 'hidden',
                }}
                className="content"
              >
                <div
                  style={{
                    height: '90%',
                    overflowY: 'auto',
                    paddingRight: '10px',
                    paddingBottom: '40px',
                    scrollbarWidth: 'none',
                  }}
                  className="scrollbar-hide"
                >
                  {datamessage.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: item.sender === loggedInUser ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {item.sender !== loggedInUser && (
                      <div className=' flex items-center gap-1'>
                          <img
                          src="https://i.pinimg.com/564x/76/34/48/76344824fd1a24149ec6adddefc89778.jpg"
                          alt="User"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        />
                        <p>{item.sender}</p>
                      </div>
                      )}
                      <div
                        style={{
                          backgroundColor: item.sender === loggedInUser ? '#B89EFF' : '#E0E0E0',
                          borderRadius: '10px',
                          padding: '10px',
                          maxWidth: '70%',
                          color: item.sender === loggedInUser ? 'white' : 'black',
                          position: 'relative',
                        }}
                      >
                        {item.text}
                      </div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '10px',
                          color: item.sender === loggedInUser ? 'lightgrey' : 'grey',
                          textAlign: 'right',
                          marginTop: '5px',
                        }}
                      >
                        {item.timestamp}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div
                  className="bg-gray-600"
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '15px',
                    width: '96%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      width: '100%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #e0e0e0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '95%' }}>
                      <FaPaperclip style={{ fontSize: '20px', cursor: 'pointer', color: "black" }} />
                      <Input
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message here..."
                        style={{
                          width: '99%',
                          borderRadius: '20px',
                          padding: '10px 15px',
                          border: 'none',
                          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
                          marginRight: '10px',
                          color: "black",
                          position: "relative"
                        }}
                      />
                      <FaSmile style={{ fontSize: '20px', cursor: 'pointer', color: "black", position: "absolute", right: "110px" }} />
                      <FaCamera style={{ fontSize: '20px', cursor: 'pointer', color: "black", position: "absolute", right: "80px" }} />
                    </div>
                    <button onClick={handleSendMessage}>
                      <IoSendSharp className='text-3xl text-blue-600' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '10px',
              width: '100%',
              height: '660px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={kirish} alt="Registration" />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Filter;
