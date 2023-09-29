import { usePopupClose } from "../hooks/usePopupClose";
import React from "react";

function PopupWithForm({ name, title, isOpened, onClose, handleSubmit, isValid, buttonText, children }) {
  usePopupClose(isOpened, onClose);

  return (
    <section className={`popup popup-${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
        <div className="popup__form-container">
          <h2 className="popup__title">{title}</h2>
          <form
            className="popup__form"
            name={name}
            onSubmit={handleSubmit}
            noValidate
          >
              {children}
            <button disabled={!isValid} className={`popup__submit-button ${!isValid ? "popup__submit-button_disabled" : ""}`} type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm
