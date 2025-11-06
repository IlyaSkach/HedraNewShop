import React from "react";
import { PLACEHOLDER_IMAGE } from "../data/constants";
import { useLanguage } from "../context/LanguageContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  const { t } = useLanguage();

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE;
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={handleImageError}
      />
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-alcohol">
          {t("alcohol")}: {product.alcohol}
        </div>
        <div className="product-price">
          {product.price} {t("currency")}
        </div>
        <div className="product-actions">
          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={() => onQuantityChange(product.id, "decrease")}
            >
              −
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => onQuantityChange(product.id, "increase")}
            >
              +
            </button>
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            <i className="fas fa-cart-plus"></i>
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
