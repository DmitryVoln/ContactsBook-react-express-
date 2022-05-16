export interface IInput {
  type:
    | "button"
    | "checkbox"
    | "file"
    | "hidden"
    | "image"
    | "password"
    | "radio"
    | "reset"
    | "submit"
    | "text";
  label?: string;
  isInvalid?: boolean;
  errorMessage?: string | boolean;
  placeholder: string;
  inputValue: string;
  onChange(event: string): void;
}
