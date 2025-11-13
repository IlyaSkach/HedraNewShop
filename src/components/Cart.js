import React, { useState, useCallback } from "react";
import { CONTACTS, DELIVERY_COST } from "../data/constants";
import { PLACEHOLDER_IMAGE_SMALL } from "../data/constants";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Cart.css";

const Cart = ({
  show,
  cart,
  onClose,
  onRemoveItem,
  getTotalPrice,
  onOrder,
}) => {
  const { t } = useLanguage();
  const [deliveryArea, setDeliveryArea] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationCoords, setLocationCoords] = useState(null);

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE_SMALL;
  };

  const resetLocation = useCallback(() => {
    setLocationStatus("idle");
    setLocationCoords(null);
  }, []);

  const handleUseLocation = () => {
    if (cart.length === 0) return;

    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("locating");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocationCoords({ latitude, longitude, accuracy });
        setLocationStatus("success");
      },
      (error) => {
        setLocationCoords(null);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus("denied");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationStatus("unavailable");
        } else if (error.code === error.TIMEOUT) {
          setLocationStatus("timeout");
        } else {
          setLocationStatus("error");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleOrder = () => {
    if (cart.length === 0 || !deliveryArea) return;

    const phoneNumber =
      deliveryArea === "alAhyaa"
        ? CONTACTS.whatsappAlAhyaa
        : CONTACTS.whatsappHurghada;

    let message = `${t("newOrder").toUpperCase()}\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   ${t("quantity")}: ${item.quantity}\n`;
      message += `   ${t("total")}: ${item.price * item.quantity} ${t(
        "currency"
      )}\n\n`;
    });

    const subtotal = getTotalPrice();
    const total = subtotal + DELIVERY_COST;

    message += `${t("deliveryArea")}: ${
      deliveryArea === "alAhyaa" ? t("alAhyaa") : t("hurghada")
    }\n`;
    message += `${t("subtotal")}: ${subtotal} ${t("currency")}\n`;
    message += `${t("delivery")}: ${DELIVERY_COST} ${t("currency")}\n`;

    if (locationCoords) {
      const latitude = Number(locationCoords.latitude).toFixed(6);
      const longitude = Number(locationCoords.longitude).toFixed(6);
      const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;

      message += `\n${t("locationCoordinates")}: ${latitude}, ${longitude}`;
      message += `\n${t("locationMapLink")}: ${mapsLink}\n`;
    } else {
      message += "\n";
    }

    message += `\n${t("orderTotal").toUpperCase()}: ${total} ${t("currency")}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      onOrder();
      onClose();
      setDeliveryArea("");
      resetLocation();
    }, 1000);
  };

  const getLocationFeedback = () => {
    switch (locationStatus) {
      case "locating":
        return { type: "info", message: t("locationProcessing") };
      case "success":
        return { type: "success", message: t("locationSuccess") };
      case "denied":
        return { type: "error", message: t("locationPermissionDenied") };
      case "unavailable":
        return { type: "error", message: t("locationUnavailable") };
      case "timeout":
        return { type: "error", message: t("locationTimeout") };
      case "unsupported":
        return { type: "error", message: t("locationUnsupported") };
      case "error":
        return { type: "error", message: t("locationError") };
      default:
        return null;
    }
  };

  const locationFeedback = getLocationFeedback();

  const handleClose = () => {
    onClose();
    resetLocation();
  };

  return (
    <div className={`cart-modal ${show ? "active" : ""}`} onClick={handleClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{t("yourCart")}</h2>
          <button className="close-cart" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">{t("cartEmpty")}</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={handleImageError}
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-quantity">
                    {t("quantity")}: {item.quantity}
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.price * item.quantity} {t("currency")}
                </div>
                <button
                  className="remove-item"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="delivery-area">
            <p>{t("deliveryArea")}</p>
            <div className="delivery-options">
              <label
                className={`delivery-option ${
                  deliveryArea === "hurghada" ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={deliveryArea === "hurghada"}
                  onChange={() =>
                    setDeliveryArea((prev) =>
                      prev === "hurghada" ? "" : "hurghada"
                    )
                  }
                />
                <span>{t("hurghada")}</span>
              </label>
              <label
                className={`delivery-option ${
                  deliveryArea === "alAhyaa" ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={deliveryArea === "alAhyaa"}
                  onChange={() =>
                    setDeliveryArea((prev) =>
                      prev === "alAhyaa" ? "" : "alAhyaa"
                    )
                  }
                />
                <span>{t("alAhyaa")}</span>
              </label>
            </div>
            {!deliveryArea && cart.length > 0 && (
              <span className="delivery-hint">{t("selectArea")}</span>
            )}
          </div>

          <div className="cart-summary">
            <div className="cart-subtotal">
              <span>{t("subtotal")}:</span>
              <span>
                {getTotalPrice()} {t("currency")}
              </span>
            </div>
            <div className="cart-delivery">
              <span>{t("delivery")}:</span>
              <span>
                {DELIVERY_COST} {t("currency")}
              </span>
            </div>
            <div className="cart-total">
              <span>{t("total")}:</span>
              <span>
                {getTotalPrice() + DELIVERY_COST} {t("currency")}
              </span>
            </div>
          </div>
          <button
            className="location-btn"
            onClick={handleUseLocation}
            disabled={cart.length === 0 || locationStatus === "locating"}
          >
            <i className="fas fa-location-arrow"></i>
            {locationStatus === "locating"
              ? t("locationProcessing")
              : t("useMyLocation")}
          </button>
          {locationFeedback && (
            <p className={`location-message ${locationFeedback.type}`}>
              {locationFeedback.message}
            </p>
          )}
          <button
            className="order-btn"
            onClick={handleOrder}
            disabled={cart.length === 0 || !deliveryArea}
          >
            <i className="fab fa-whatsapp"></i> {t("orderWhatsApp")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
