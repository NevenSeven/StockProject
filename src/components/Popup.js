import React, { useEffect, useState } from 'react';

const popupMessages = [
  "🚨 Win a brand new iPhone NOW!",
  "💰 You've been selected for a free $500 gift card!",
  "🧽 Clean your PC with one click!",
  "🎉 Mr. Beats wants to give you a free car! Click here :)",
  "😱 ALERT: Your system may be at risk!"
];

function getRandomPosition() {
  const top = Math.random() * (window.innerHeight - 200);
  const left = Math.random() * (window.innerWidth - 320);
  return { top, left };
}

function FakePopup({ id, message, onClose }) {
  const { top, left } = getRandomPosition();

  return (
    <div
      className="alert alert-warning position-fixed shadow p-3"
      style={{
        top,
        left,
        width: '300px',
        zIndex: 9999,
        animation: 'wiggle 0.3s infinite'
      }}
    >
      <strong>{message}</strong>
      <br />
      <button
        className="btn btn-danger btn-sm mt-2 me-2"
        onClick={() => alert('Gotcha 😂')}
      >
        Click Here!
      </button>
      <button
        type="button"
        className="btn-close position-absolute"
        style={{ top: '10px', right: '10px' }}
        onClick={() => onClose(id)}
      />
    </div>
  );
}

const PopupSpawner = () => {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const message = popupMessages[Math.floor(Math.random() * popupMessages.length)];
      setPopups((prev) => [...prev, { id, message }]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const removePopup = (id) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <>
      <style>
        {`
          @keyframes wiggle {
            0% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
            100% { transform: rotate(-1deg); }
          }
        `}
      </style>
      {popups.map((popup) => (
        <FakePopup
          key={popup.id}
          id={popup.id}
          message={popup.message}
          onClose={removePopup}
        />
      ))}
    </>
  );
};

export default PopupSpawner;
