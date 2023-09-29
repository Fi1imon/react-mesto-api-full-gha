import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Input from "./Input";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const [buttonText, setButtonText] = React.useState('Сохранить');
  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, setValues} = useFormAndValidation();

  React.useEffect(() => {
    setValues({...values, profileName: currentUser.name, about: currentUser.about});
  }, [currentUser, props.isOpened])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdate({name: values.profileName, about: values.about, setButtonText})
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpened={props.isOpened}
      onClose={props.onClose}
      buttonText={buttonText}
      handleSubmit={handleSubmit}
      isValid={isValid}

    >
      <Input
        type="text"
        id="name-input"
        inputClassName="popup__input popup__input_position_top"
        errorClassName="popup__input-error name-input-error"
        name="profileName"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values.profileName || ''}
        handleChange={handleChange}
        error={errors.profileName}
        required/>
      <Input
        type="text"
        id="job-input"
        inputClassName="popup__input popup__input_position_bottom"
        errorClassName="popup__input-error job-input-error"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={values.about || ''}
        handleChange={handleChange}
        error={errors.about}
        required/>
    </PopupWithForm>
  )
}

export default EditProfilePopup
