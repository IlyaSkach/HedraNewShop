import React, { useState } from "react";
import { productsData } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "./ProductCard";
import "../styles/Products.css";

const Products = ({ subcategory, title, show, onAddToCart }) => {
  const { t } = useLanguage();
  const [quantities, setQuantities] = useState({});

  if (!show || !subcategory) return null;

  const products = productsData[subcategory] || [];
  const displayTitle = title || subcategory;

  const handleQuantityChange = (productId, action) => {
    setQuantities((prev) => {
      const currentQty = prev[productId] || 1;
      let newQty = currentQty;

      if (action === "increase") {
        newQty = currentQty + 1;
      } else if (action === "decrease" && currentQty > 1) {
        newQty = currentQty - 1;
      }

      return { ...prev, [productId]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    onAddToCart(product, quantity);
  };

  return (
    <section className="products-section">
      <div className="container">
        <h2>
          {displayTitle} - {t("productsTitle")}
        </h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
