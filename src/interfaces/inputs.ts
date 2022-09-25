import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface IInputTextProps {
  required: boolean;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  register: any;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  disabled: boolean;
}

export interface IButtonProps {
  variant: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  label: string;
  handleClick?: () => void;
}
