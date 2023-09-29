import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const [buttonText, setButtonText] = React.useState('Сохранить');
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm()
  }, [props.isOpened])

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddCard({title: values.title, imageUrl: values.imageUrl, setButtonText})
  }

  return(
    <PopupWithForm
      name={'item'}
      title={'Новое Место'}
      isOpened={props.isOpened}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      isValid={isValid}
      buttonText={buttonText}

    >
      <Input
        type="text"
        id="title-input"
        inputClassName="popup__input popup__input_position_top"
        errorClassName="popup__input-error name-input-error"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.title || ''}
        handleChange={handleChange}
        error={errors.title}
        required/>
      <Input
        type="url"
        id="image-url-input"
        inputClassName="popup__input popup__input_position_bottom"
        errorClassName="popup__input-error job-input-error"
        name="imageUrl"
        placeholder="Ссылка на картинку"
        value={values.imageUrl || ''}
        handleChange={handleChange}
        error={errors.imageUrl}
        required/>
    </PopupWithForm>
  )
}

export default AddPlacePopup
