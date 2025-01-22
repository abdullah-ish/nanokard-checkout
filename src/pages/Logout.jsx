import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InnerLayout from "../components/layout/InnerLayout";
import AuthContext from "../contexts/auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../components/Toast";
import WelcomeBanner from "../components/layout/WelcomeBanner";

function Logout() {
  const navigate = useNavigate();
  const { logOut, setExistingUserData } = useContext(AuthContext);

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleLogoutClick = async () => {
    try {
      const res = await logOut();
      setExistingUserData(null);
      navigate("/signup");
      showSuccessToast("Logged Out Successfully");
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        showErrorToast(error.message);
        console.log("logout api error-------------", error.message);
      }
    }
  };

  return (
    <div>
      <div className="hidden sm:block">
        <InnerLayout welcomeBanner>
          <div className="w-[420px] h-[615px] flex flex-col items-center gap-8">
            <p className="heading-2 w-[262px] h-[54px] text-center">
              Log out of your NanoKard account?
            </p>
            <div className="w-full flex flex-col items-center gap-8">
              <button
                className="blue-btn-lg sm:w-[287px] w-full"
                onClick={handleLogoutClick}
              >
                Log out
              </button>
              <button className="cancel-btn" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        </InnerLayout>
      </div>
      <div className="block sm:hidden bg-white">
        <WelcomeBanner />
        <div className="w-full min-h-[402px] h-[calc(100vh-310px)] flex flex-col items-center justify-center gap-8 p-6">
          <p className="heading-2 w-[262px] h-[54px] text-center">
            Log out of your NanoKard account?
          </p>
          <div className="w-[262px] flex flex-col items-center gap-8">
            <button
              className="blue-btn-lg h-[36px] w-[262px] w-full"
              onClick={handleLogoutClick}
            >
              Log out
            </button>
            <button className="cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
