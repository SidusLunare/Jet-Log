import { createContext, useContext, useState, useRef, useCallback } from "react";

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const timerRef = useRef(null);

  const clearAlert = useCallback(() => {
    setAlert(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showAlert = useCallback((message, type = "info", timeout = 2000) => {
    setAlert({ message, type });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAlert(null);
      timerRef.current = null;
    }, timeout);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

export default AlertContext;
