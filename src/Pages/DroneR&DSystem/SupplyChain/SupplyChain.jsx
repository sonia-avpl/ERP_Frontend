import { Outlet } from "react-router-dom";

const SupplyChain = () => {
  return (
    <div className="p-4">
      <Outlet />
      <p>Supply Chain</p>
    </div>
  );
};

export default SupplyChain;
