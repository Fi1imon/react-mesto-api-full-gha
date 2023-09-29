import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletionConfirmationPopup(props) {
  const [buttonText, setButtonText] = React.useState('Да')

  function handleSubmit(e) {
    e.preventDefault()

    props.handleSubmit({setButtonText})
  }

  return (
    <PopupWithForm
      name={'delete'}
      title={'Вы уверены?'}
      isValid={true}
      isOpened={props.isOpened}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
    />
  )
}

export default DeletionConfirmationPopup
