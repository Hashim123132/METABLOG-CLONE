/* eslint-disable react/prop-types */
import  { useState } from 'react';
import AlertContext from './AlertContext';

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  // Show alert with a custom message and type (e.g., success, error, info)
  const showAlert = (message, type, duration = 3000) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), duration);  // Hide alert after the specified duration
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
