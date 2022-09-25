import { IButtonProps } from "../../interfaces/inputs";

const Button = ({
  type,
  disabled,
  variant,
  label,
  handleClick,
}: IButtonProps) => {
  return (
    <>
      {variant === "primary" && (
        <button type={type} disabled={disabled} onClick={handleClick}>
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
