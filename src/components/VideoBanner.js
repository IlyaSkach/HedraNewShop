import React from "react";
import "../styles/VideoBanner.css";

const VideoBanner = () => {
  return (
    <section className="video-banner">
      <video autoPlay muted loop playsInline>
        <source src="/assets/images/video.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>
      {/*       <div className="banner-overlay">
        <h1>Welcome to HedraNewShop</h1>
        <p>Quality beverages with delivery</p>
      </div> */}
    </section>
  );
};

export default VideoBanner;
