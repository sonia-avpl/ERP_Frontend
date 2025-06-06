import { Toaster } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";

const App = () => {
  return (
    <>
      <AllRoutes />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
