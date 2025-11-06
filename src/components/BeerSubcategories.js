import React from "react";
import { beerBrands } from "../data/products";
import { PLACEHOLDER_IMAGE_SMALL } from "../data/constants";
import { useLanguage } from "../context/LanguageContext";
import "../styles/BeerSubcategories.css";

const BeerSubcategories = ({ show, onBrandSelect }) => {
  const { t } = useLanguage();

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE_SMALL;
  };

  if (!show) return null;

  return (
    <section className="subcategories-section">
      <div className="container">
        <h2>{t("beerSubcategoriesTitle")}</h2>
        <div className="subcategories-list">
          {beerBrands.map((brand) => (
            <div
              key={brand.id}
              className="subcategory-item"
              onClick={() => onBrandSelect(brand.id)}
            >
              <img
                src={brand.image}
                alt={brand.name}
                onError={handleImageError}
              />
              <h3>{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeerSubcategories;
