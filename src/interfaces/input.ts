export interface InputComponent {
  placeholder?: string;
  inputHandler(event: string): void;
  inputValue: string;
}
