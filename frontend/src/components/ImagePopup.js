import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup(props) {
  usePopupClose(props.isOpened, props.onClose);

  return (
    <section className={`popup popup-image ${props.isOpened ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <button onClick={props.onClose} className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
        <img className="popup-image__photo" src={props.card.link} alt={props.card.name} />
        <p className="popup-image__name">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup
