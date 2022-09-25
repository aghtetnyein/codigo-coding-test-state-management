import { IButtonProps } from "../../interfaces/inputs";

const Button = ({
  type,
  disabled,
  variant,
  label,
  icon,
  handleClick,
}: IButtonProps) => {
  return (
    <>
      {variant === "icon" ? (
        <button
          className="border border-gray-300 hover:bg-gray-100 p-2"
          onClick={handleClick}
        >
          {icon}
        </button>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={handleClick}
          className={`w-full inline-flex items-center justify-center gap-2 h-10 py-2 px-4 text-sm font-semibold bg-primary focus:outline-none 
            ${
              variant === "primary" &&
              "hover:bg-primaryHover border border-transparent text-white"
            }
            ${
              variant === "bordered" &&
              "bg-transparent hover:bg-gray-200 border border-gray-300 text-dark"
            }
            ${variant === "danger" && "bg-red hover:bg-redHover text-white"}
          `}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
