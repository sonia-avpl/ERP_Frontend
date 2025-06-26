
const LoadinSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <span className="mt-2 text-sm text-gray-600">{text}</span>
      </div>
    </div>
  );
};

export default LoadinSpinner;
