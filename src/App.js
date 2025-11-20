import React, { useState, useRef } from "react";
import Header from "./components/Header";
import VideoBanner from "./components/VideoBanner";
import InfoBanner from "./components/InfoBanner";
import InstallPrompt from "./components/InstallPrompt";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { useCart } from "./hooks/useCart";
import { subcategoriesByCategory } from "./data/products";
import { useLanguage } from "./context/LanguageContext";
import "./App.css";

function App() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeSubcategoryName, setActiveSubcategoryName] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  const subcategorySectionRef = useRef(null);
  const productsSectionRef = useRef(null);

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
    setActiveSubcategoryName("");

    setTimeout(() => {
      subcategorySectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubcategorySelect = (subcategory) => {
    setActiveSubcategory(subcategory.id);
    setActiveSubcategoryName(subcategory.name);

    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  const handleOrder = () => {
    clearCart();
  };

  const currentSubcategories =
    (activeCategory && subcategoriesByCategory[activeCategory]) || [];

  const subcategoryTitle =
    activeCategory === "beer"
      ? t("beerSubcategoriesTitle")
      : activeCategory === "wine"
      ? t("wineSubcategoriesTitle")
      : activeCategory === "spirits"
      ? t("spiritsSubcategoriesTitle")
      : activeCategory === "rtd"
      ? t("rtdSubcategoriesTitle")
      : "";

  return (
    <div className="App">
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={() => setShowCart(true)}
        cartAnimation={cartAnimation}
      />

      <VideoBanner />

      <InfoBanner />

      <Categories onCategorySelect={handleCategorySelect} />

      <div ref={subcategorySectionRef}>
        <Subcategories
          show={!!activeCategory}
          title={subcategoryTitle}
          subcategories={currentSubcategories}
          onSelect={handleSubcategorySelect}
        />
      </div>

      <div ref={productsSectionRef}>
        <Products
          subcategory={activeSubcategory}
          title={activeSubcategoryName}
          show={activeSubcategory !== null}
          onAddToCart={handleAddToCart}
        />
      </div>

      <Cart
        show={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onRemoveItem={removeFromCart}
        getTotalPrice={getTotalPrice}
        onOrder={handleOrder}
      />

      <InstallPrompt />
    </div>
  );
}

export default App;
