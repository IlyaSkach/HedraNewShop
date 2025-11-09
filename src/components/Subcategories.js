import React from "react";
import { PLACEHOLDER_IMAGE_SMALL } from "../data/constants";
import "../styles/Subcategories.css";

const Subcategories = ({ show, title, subcategories = [], onSelect }) => {
  if (!show || subcategories.length === 0) {
    return null;
  }

  const handleImageError = (event) => {
    event.target.src = PLACEHOLDER_IMAGE_SMALL;
  };

  return (
    <section className="subcategories-section">
      <div className="container">
        <h2>{title}</h2>
        <div className="subcategories-list">
          {subcategories.map((item) => (
            <div
              key={item.id}
              className="subcategory-item"
              onClick={() => onSelect(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                onError={handleImageError}
              />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subcategories;
