import React from "react";

const Card = ({ imageSrc, title, description }) => {
  return (
    <div className="bg-black">
      <div className="flex flex-1 bg-pink-500 w-52 h-40 shadow-lg rounded-lg overflow-hidden  ml-6">
        <div className="align-center">
          <img
            src={imageSrc}
            alt="Card"
            className="object-cover bg-blue-600 h-28 w-16 "
          />
        </div>
        <div className="28">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
