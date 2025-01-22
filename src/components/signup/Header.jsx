import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
    const {isMobile} = useContext(AuthContext);
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {!isMobile && (
        <div className="sm:p-0 p-6 w-full gap-1">
        <h2 className="heading-2">Create a NanoKard account to pay</h2>
        <span className="paragraph-lg text-mediumGray">
        Already have an account?
      </span>
        <button className="text-btn-blue ml-1" onClick={handleLoginClick}>
          Log in
        </button>
      </div>
      )}
    </>
  );
};

export default Header;
