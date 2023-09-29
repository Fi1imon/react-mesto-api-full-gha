import React from "react";

function Input(props) {

  return (
    <>
      <input
        type={props.type}
        id={props.id}
        className={props.inputClassName}
        name={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.handleChange}
        required
      />
      <span
        className={props.errorClassName}
      >
        {props.error}
      </span>
    </>
  )
}

export default Input
