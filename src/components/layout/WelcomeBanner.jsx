import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";

const WelcomeBanner = () => {
  const navigate = useNavigate();
  const { existingUserData } = useContext(AuthContext);

  const handleLogoutClick = () => {
    navigate("/logout");
  };
  return (
    <div className="w-full sm:h-[50px] h-[43px] py-4 px-6 bg-white flex justify-between items-center sm:rounded-t-lg border border-lightBlue">
      <p>
        Welcome back, {existingUserData?.user?.first_name}{" "}
        {existingUserData?.user?.last_name}
      </p>

      <span className="active-blue" onClick={handleLogoutClick}>
        Log out
      </span>
    </div>
  );
};

export default WelcomeBanner;
