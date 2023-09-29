import { usePopupClose } from "../hooks/usePopupClose";
import { useEffect, useState } from "react";

function InfoTooltip (props) {
  const [tooltipText, setTooltipText] = useState('')

  usePopupClose(props.isOpened, props.onClose);

  useEffect(() => {
    return  props.authenticationState ? setTooltipText(`Вы успешно зарегистрировались!`) : setTooltipText('Что-то пошло не так!\n' +
      'Попробуйте ещё раз.')
  }, [props.authenticationState])

  return (
    <section className={`popup popup-tooltip ${props.isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
        <div className="popup-tooltip__container">
          <div className={`popup-tooltip__img ${props.authenticationState ? "popup-tooltip__img_success" : "popup-tooltip__img_fail"}`}/>
          <h2 className="popup-tooltip__text">{tooltipText}</h2>
        </div>
      </div>
    </section>
  )
}

export default InfoTooltip
