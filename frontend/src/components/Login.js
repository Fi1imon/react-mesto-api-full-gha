import { useEffect } from "react";
import Input from "./Input";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function Login({ setHeaderText, handleLogin }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  useEffect(() => {
    setHeaderText('Регистрация');
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    handleLogin({ email: values.loginEmail, password: values.loginPassword })
  }

  return (
    <section className="authentication">
      <h1 className="authentication__title">Вход</h1>
      <form className="authentication__form" name="authorization" onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          id="mail-input"
          inputClassName="authentication__input authentication__input_position_top"
          errorClassName="mail-input-error popup__input-error"
          name="loginEmail"
          placeholder="Email"
          minLength="4"
          maxLength="40"
          value={values.loginEmail || ''}
          handleChange={handleChange}
          error={errors.loginEmail}
          required
        />
        <Input
          type="password"
          autocomplete="current-password"
          id="password-input"
          inputClassName="authentication__input authentication__input_position_bottom"
          errorClassName="password-input-error popup__input-error"
          name="loginPassword"
          placeholder="Пароль"
          minLength="5"
          maxLength="25"
          value={values.loginPassword || ''}
          handleChange={handleChange}
          error={errors.loginPassword}
          required
        />

        <button disabled={!isValid} className="authentication__submit-button" >Войти</button>
      </form>
    </section>
  )
}

export default Login
