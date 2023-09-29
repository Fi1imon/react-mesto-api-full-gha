import { useEffect } from "react";

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        closePopup()
      }
    };

    const handleEscapeClick = (e) => {
      if (e.key === "Escape") {
        closePopup()
      }
    };

    document.addEventListener("keydown", handleEscapeClick);
    document.addEventListener("mousedown", handleOverlayClick);
    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, closePopup])
}
