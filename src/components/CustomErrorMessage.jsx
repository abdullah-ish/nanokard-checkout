import React from "react";
import { MdCancel } from "react-icons/md";
const CustomErrorMessage = ({ children }) => (
  <div className="flex items-center red-para w-[250px]">
    <MdCancel className="w-[12px] h-[14px]" />
    <span className="text-red-600 text-[10px] ml-1">{children}</span>
  </div>
);

export default CustomErrorMessage;
