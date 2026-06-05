import React from "react";
import { useAlert } from "./AlertContext";

const Alert = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  return (
    <div className={`app-alert app-alert--${alert.type}`} role="status">
      <p className="app-alert__message">{alert.message}</p>
    </div>
  );
};

export default Alert;
