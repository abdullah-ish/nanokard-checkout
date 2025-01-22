import React from "react";
import Spinner from "./Spinner";

function LoadingScreen({ children }) {
  return (
    <div className="w-full h-[740px] flex flex-col items-center bg-white justify-center gap-12">
      <Spinner />
      <div className="w-[308px] space-y-2 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

export default LoadingScreen;
