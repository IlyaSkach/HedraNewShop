import React, { useState } from "react";
import { CONTACTS } from "../data/constants";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Header.css";

const Header = ({ cartItemsCount, onCartClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img
              src="/assets/images/logo.png"
              alt="HedraNewShop Logo"
              id="logo-placeholder"
            />
          </div>
          <div className="header-icons">
            <button
              className="burger-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="language-switcher">
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${language === "ru" ? "active" : ""}`}
                onClick={() => setLanguage("ru")}
              >
                RU
              </button>
            </div>

            <div className="desktop-contacts">
              <a
                href={`tel:${CONTACTS.phone}`}
                className="icon-link"
                title={t("phone")}
              >
                <i className="fas fa-phone"></i>
              </a>
              <a
                href={`https://wa.me/${CONTACTS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link whatsapp-link"
                title={t("whatsapp")}
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href={`https://t.me/${CONTACTS.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link telegram-link"
                title={t("telegram")}
              >
                <i className="fab fa-telegram-plane"></i>
              </a>
            </div>

            <div className="cart-icon-wrapper" onClick={onCartClick}>
              <div className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                {cartItemsCount > 0 && (
                  <span className="cart-count">{cartItemsCount}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a
          href={`tel:${CONTACTS.phone}`}
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          <i className="fas fa-phone"></i>
          <span>{t("phone")}</span>
        </a>
        <a
          href={`https://wa.me/${CONTACTS.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          <i className="fab fa-whatsapp"></i>
          <span>WhatsApp</span>
        </a>
        <a
          href={`https://t.me/${CONTACTS.telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          <i className="fab fa-telegram-plane"></i>
          <span>Telegram</span>
        </a>
      </div>

      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
