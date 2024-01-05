import { ReactNode } from "react";

interface Props {
  children: ReactNode; //children tells the component that it will be a child of a parent component
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick = {onClose}
      ></button>
    </div>
  );
};

export default Alert;
