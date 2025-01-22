import React from "react";
import InnerLayout from "../components/layout/InnerLayout";
import ExistingUserLogin from "../components/Login/ExistingUserLogin";
import LoginForm from "../components/Login/LoginForm";

function SendOtp() {
  return (
    <div>
        <div className="hidden sm:block">
            <InnerLayout>
                <ExistingUserLogin/>
            </InnerLayout>
        </div>
        <div className="block sm:hidden bg-white">
            <ExistingUserLogin/>
        </div>
    </div>
)
    ;
}

export default SendOtp;
