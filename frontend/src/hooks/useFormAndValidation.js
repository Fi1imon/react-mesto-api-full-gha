import {useState, useCallback} from "react";

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((emptyValues = {}, emptyErrors = {}, newIsValid = false) => {
    setValues(emptyValues);
    setErrors(emptyErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid])

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
