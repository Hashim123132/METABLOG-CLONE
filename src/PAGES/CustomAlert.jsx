const CustomAlert = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 w-80 rounded-md ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white font-semibold`}
    >
      <div className="flex justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">×</button>
      </div>
    </div>
  );
};
export default CustomAlert;