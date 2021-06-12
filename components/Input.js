const Input = ({
  inputProps,
  inputType = "text",
  label,
  inputClasses,
  display,
  register,
  confirmField = false,
  formState,
  getValues,
  errorClasses,
}) => {
  const { errors } = formState;

  const fields = [label];
  return (
    <>
      <label htmlFor={label}>{display}</label>
      <input
        {...register(label, { ...inputProps })}
        className={inputClasses}
        type={inputType}
      />
      {errors[label] && <p className={errorClasses}>{errors[label].message}</p>}

      {confirmField && (
        <>
          <label htmlFor={`${label}Confirmation`}>{`Confirm ${label}`}</label>
          <input
            {...register(`${label}Confirmation`, {
              validate: {
                matchesPreviousField: (value) => {
                  const { [fields[0]]: initVal } = getValues();
                  return initVal === value || `${label}s do not match!`;
                },
              },
            })}
            className={inputClasses}
            type={inputType}
          />
          {errors[`${label}Confirmation`] && (
            <p className={errorClasses}>
              {errors[`${label}Confirmation`].message}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default Input;
