import { useEffect } from "react";
import Input from "./Input";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { useNavigate } from "react-router-dom";

function Register({ setHeaderText, handleRegistration }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const navigate = useNavigate();

  function goToLoginPage() {
    return navigate("/sign-in")
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleRegistration({ email: values.registerEmail, password: values.registerPassword });
  }

  useEffect(() => {
    setHeaderText('Войти');
  }, [])

  return(
    <section className="authentication">
      <h1 className="authentication__title">Регистрация</h1>
      <form className="authentication__form" name="register" onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          id="mail-input"
          inputClassName="authentication__input authentication__input_position_top"
          errorClassName="mail-input-error popup__input-error"
          name="registerEmail"
          placeholder="Email"
          minLength="4"
          maxLength="40"
          value={values.registerEmail || ''}
          handleChange={handleChange}
          error={errors.registerEmail}
          required
        />
        <Input
          type="password"
          id="password-input"
          inputClassName="authentication__input authentication__input_position_bottom"
          errorClassName="password-input-error popup__input-error"
          name="registerPassword"
          placeholder="Пароль"
          minLength="5"
          maxLength="25"
          value={values.registerPassword || ''}
          handleChange={handleChange}
          error={errors.registerPassword}
          required
        />

        <button disabled={!isValid} className="authentication__submit-button" >Зарегистрироваться</button>
        <p className="authentication__sign-in-inscription">Уже зарегистрированы? <button className="authentication__sign-in-button" type="button" onClick={goToLoginPage}>Войти</button></p>
      </form>
    </section>
  )
}

export default Register
