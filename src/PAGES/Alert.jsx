import React, { useContext } from 'react';
import AlertContext from '../Context/Alert/AlertContext';  // Correct path

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    
    alert && (
      <div className={`fixed top-[170px] left-1/2 transform -translate-x-1/2 p-4 rounded-md text-white shadow-lg transition-all duration-900 ease-in-out z-50 
        ${alert.type === 'success' ? 'bg-green-500' : ''}
        ${alert.type === 'danger' ? 'bg-red-500' : ''}
        ${alert.type === 'info' ? 'bg-blue-500' : ''}
        ${alert.type === 'warning' ? 'bg-yellow-500' : ''}`}>
        {alert.msg}
      </div>
    )
  );
};

export default Alert;