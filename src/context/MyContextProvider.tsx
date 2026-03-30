import { MyContext } from "./MyContext.tsx";
import type { ReactNode } from "react";
import { useState } from "react";

interface ContextProp {
    children:ReactNode
}

const MyContextProvider = ({ children }: ContextProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const providerValues:any= { loading, setLoading };

  return (
    <MyContext.Provider value={providerValues}>{children}</MyContext.Provider>
  );
};

export default MyContextProvider;
