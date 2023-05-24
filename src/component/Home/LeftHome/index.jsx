import { useTrialContext } from "@/context/TrialContextProvider";
import React from "react";
import { useRef, useEffect, useState } from "react";

function LeftHome() {
  const { name, prevName, handleClick } = useTrialContext();

  return (
    <div>
      LeftHome:{name}
      <button onClick={handleClick}>change name</button>
      <input ref={prevName} type="text" />
    </div>
  );
}

export default LeftHome;
