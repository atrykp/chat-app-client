import "./Button.scss";

interface IButton {
  callback?(): void;
  styles?: string;
  type?: "button" | "submit" | "reset" | undefined;
  children?: string;
  secondary?: boolean;
}

const Button = ({ callback, children, styles, type, secondary }: IButton) => {
  return (
    <button
      onClick={() => callback && callback()}
      className={`${secondary ? "secondary-btn" : "primary-btn"} ${styles}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
