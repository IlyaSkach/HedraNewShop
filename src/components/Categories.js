import React from "react";
import { categories } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Categories.css";

const Categories = ({ onCategorySelect }) => {
  const { t } = useLanguage();

  return (
    <section className="categories-section">
      <div className="container">
        <h2>{t("categoriesTitle")}</h2>
        <div className="categories-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item ${
                !category.active ? "category-disabled" : ""
              }`}
              style={{ backgroundImage: `url(${category.image})` }}
              onClick={() => category.active && onCategorySelect(category.id)}
            >
              <h3>{t(category.id)}</h3>
              {!category.active && (
                <span className="coming-soon">{t("comingSoon")}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
