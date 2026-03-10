import { useEffect } from "react";
import "./App.css";
import { useAuth } from "@clerk/react";
import { attachTokenInterceptor } from "./api/client.ts";
import { RouterProvider } from "react-router-dom";
import {router} from "./routes/route.tsx"

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachTokenInterceptor(getToken);
  }, []);
  return <RouterProvider router={router} />
};

export default App;
