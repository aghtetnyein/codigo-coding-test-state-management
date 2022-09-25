// interface
import { IInputTextProps } from "../../interfaces/inputs";

const InputText = ({
  required,
  type,
  name,
  label,
  placeholder,
  register,
  error,
  disabled,
}: IInputTextProps) => {
  return (
    <div>
      <label htmlFor={name}>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        {...register}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      <>{error}</>
    </div>
  );
};

export default InputText;
