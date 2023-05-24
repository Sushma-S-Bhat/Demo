import { supabase } from "@/utils/supabaseClient";
import React, { useEffect, useRef } from "react";
import { useContext, useState, createContext } from "react";

const TrialContext = createContext();
const useTrialContext = () => useContext(TrialContext);

function TrialContextProvider({ children }) {
  const [name, setName] = useState("");

  const prevName = useRef(null);

  async function handleClick() {
    setName(prevName.current.value);
  }

  return (
    <TrialContext.Provider
      value={{
        name,
        setName,
        prevName,
        handleClick,
      }}
    >
      {children}
    </TrialContext.Provider>
  );
}
export { TrialContextProvider, useTrialContext, TrialContext };
