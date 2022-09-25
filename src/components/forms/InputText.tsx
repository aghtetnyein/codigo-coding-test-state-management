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
      <div className="flex">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {required && (
          <label className="block ml-1 text-sm font-medium text-red">*</label>
        )}
      </div>
      <input
        {...register}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="appearance-none my-1 block w-full px-3 h-10 border border-gray-300 placeholder-gray-400 focus:outline-none sm:text-sm"
      />
      <p className="block text-xs font-medium text-red">{error}</p>
    </div>
  );
};

export default InputText;
