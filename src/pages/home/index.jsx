import Home from "@/component/Home";
import {
  TrialContextProvider,
  useTrialContext,
} from "@/context/TrialContextProvider";
import React from "react";

function HomePage() {
  return (
    <TrialContextProvider>
      <Home />
    </TrialContextProvider>
  );
}

export default HomePage;
