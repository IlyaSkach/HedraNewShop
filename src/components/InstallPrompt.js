import React, { useEffect, useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/InstallPrompt.css";

const InstallPrompt = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [showSafariPrompt, setShowSafariPrompt] = useState(false);
  const [isMacOS, setIsMacOS] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;
      setIsInstalled(isStandalone);
      return isStandalone;
    };

    const detectSafari = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isSafariBrowser = 
        /safari/.test(userAgent) && 
        !/chrome|crios|fxios|edg/.test(userAgent);
      
      const isMac = /macintosh|mac os x/.test(userAgent) && 
                    !/iphone|ipad|ipod/.test(userAgent);
      
      if (isSafariBrowser) {
        setIsSafari(true);
        setIsMacOS(isMac);
        const installed = checkStandalone();
        if (!installed) {
          const dismissed = localStorage.getItem("safari-install-prompt-dismissed");
          if (!dismissed) {
            setShowSafariPrompt(true);
          }
        }
      }
    };

    const isStandalone = checkStandalone();
    if (!isStandalone) {
      detectSafari();
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowSafariPrompt(false);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowSafariPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("visibilitychange", checkStandalone);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("visibilitychange", checkStandalone);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleCloseSafariPrompt = useCallback(() => {
    setShowSafariPrompt(false);
    localStorage.setItem("safari-install-prompt-dismissed", "true");
  }, []);

  if (isInstalled) {
    return null;
  }

  if (isSafari && showSafariPrompt && !deferredPrompt) {
    return (
      <div className="install-banner">
        <div className="install-banner__content">
          <button
            className="install-banner__close"
            onClick={handleCloseSafariPrompt}
            aria-label="Close"
          >
            ×
          </button>
          <p className="install-banner__text">{t("installAppMessage")}</p>
          <p className="install-banner__instructions">
            {isMacOS ? t("installMacOSInstructions") : t("installIOSInstructions")}
          </p>
        </div>
      </div>
    );
  }

  if (!deferredPrompt) {
    return null;
  }

  return (
    <div className="install-banner">
      <div className="install-banner__content">
        <p className="install-banner__text">{t("installAppMessage")}</p>
        <button className="install-banner__button" onClick={handleInstall}>
          {t("installAppButton")}
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;

