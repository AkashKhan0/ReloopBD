import React, { useState } from "react";

const Livechat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-container">
      {/* Chat Button */}
      <div onClick={toggleChat} className="chat-button">
        💬
      </div>

      {/* Popup Chat Box */}
      {isOpen && (
        <div className="popup-box">
          <h3 className="popup-title tspan">Chat with Us!</h3>
          <div className="chat-options">
            <a
              href="https://m.me/YOUR_PAGE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="chat-link subTeam"
            >
              Chat via Messenger
            </a>
            <a
              href="https://wa.me/8801600041610?text=Hi!%20I%20need%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="chat-link subTeam"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Livechat;
