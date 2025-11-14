import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/InfoBanner.css";

const InfoBanner = () => {
  const { t } = useLanguage();

  const backgroundImage = {
    backgroundImage: `linear-gradient(rgba(12, 27, 45, 0.75), rgba(12, 27, 45, 0.8)), url(${
      process.env.PUBLIC_URL
    }/assets/images/baner.png)`,
  };

  return (
    <section className="info-banner" style={backgroundImage}>
      <div className="info-banner__content">
        <p className="info-banner__title">{t("customRequestsTitle")}</p>
        <p className="info-banner__message">{t("customRequestsMessage")}</p>
      </div>
    </section>
  );
};

export default InfoBanner;

