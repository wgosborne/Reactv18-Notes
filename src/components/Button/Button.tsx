import styles from "./Button.module.css";

interface Props {
  //usually these are alphabetical
  color?: "primary" | "secondary"; //question mark makesit optional
  children: string;
  onClick: () => void;
}

//set a default by using the =
export const Button = ({ color = "primary", children, onClick }: Props) => {
  return (
    <button className={[styles.btn, styles["btn-" + color]].join(' ')} onClick={onClick}>
      {children}
    </button>
  );
};
