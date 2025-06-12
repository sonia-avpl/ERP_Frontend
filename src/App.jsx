import { Toaster } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";
import { AuthProvider } from "./components/context/AuthContext";

const App = () => {
  return (
    <>
    <AuthProvider>
      <AllRoutes />
      <Toaster position="top-right" />
      </AuthProvider>
    </>
  );
};

export default App;
