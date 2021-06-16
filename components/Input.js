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
    <div className="my-5 w-full">
      <label htmlFor={label} className="flex flex-col justify-between mb-2">
        {`${display}:`}
        <input
          {...register(label, { ...inputProps })}
          className={`${inputClasses}`}
          type={inputType}
        />
        {errors[label] && (
          <p className={`${errorClasses}`}>{errors[label].message}</p>
        )}
      </label>

      {confirmField && (
        <>
          <label
            htmlFor={`${label}Confirmation`}
            className="flex flex-col justify-between"
          >
            {`Confirm ${label}`}
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
          </label>
        </>
      )}
    </div>
  );
};

export default Input;
