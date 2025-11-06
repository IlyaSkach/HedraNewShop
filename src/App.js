import React, { useState, useRef } from "react";
import Header from "./components/Header";
import VideoBanner from "./components/VideoBanner";
import Categories from "./components/Categories";
import BeerSubcategories from "./components/BeerSubcategories";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { useCart } from "./hooks/useCart";
import "./App.css";

function App() {
  const [showBeerSection, setShowBeerSection] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  const beerSectionRef = useRef(null);
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
    if (categoryId === "beer") {
      setShowBeerSection(true);
      setTimeout(() => {
        beerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId);
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    // Анимация корзины
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  const handleOrder = () => {
    clearCart();
  };

  return (
    <div className="App">
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={() => setShowCart(true)}
        cartAnimation={cartAnimation}
      />

      <VideoBanner />

      <Categories onCategorySelect={handleCategorySelect} />

      <div ref={beerSectionRef}>
        <BeerSubcategories
          show={showBeerSection}
          onBrandSelect={handleBrandSelect}
        />
      </div>

      <div ref={productsSectionRef}>
        <Products
          brand={selectedBrand}
          show={selectedBrand !== null}
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
    </div>
  );
}

export default App;
