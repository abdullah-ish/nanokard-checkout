import React from "react";
import Form from "../components/Login/code/Form";
import InnerLayout from "../components/layout/InnerLayout";
import ExistingUserLogin from "../components/Login/ExistingUserLogin";

function VerificationCode() {
  return (
      <div>
          <div className="hidden sm:block">
              <InnerLayout>
                  <Form/>
              </InnerLayout>
          </div>
          <div className="block sm:hidden bg-white">
              <Form/>
          </div>
      </div>
  );
}

export default VerificationCode;
