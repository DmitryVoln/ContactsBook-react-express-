export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  children: string | number | React.ReactNode;
  type: "button" | "submit" | "reset";
  disabled: boolean;
  btnClassName: string;
}
