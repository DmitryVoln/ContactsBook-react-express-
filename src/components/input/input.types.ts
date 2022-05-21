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
    | "text"
    | "tel";
  placeholder: string;
  inputValue: string;
  label?: string;
  isInvalid?: boolean;
  errorMessage?: string | boolean;
  onChange(event: string): void;
  checked?: boolean;
  isModalOpen: boolean;
  pattern: string;
  isRequired: boolean;
}
