import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import VerificationCode from "./pages/VerificationCode";
import PaymentInformation from "./pages/PaymentInformation";
import Home from "./pages/Home";
import VerifyCard from "./components/PaymentProcessing/VerifyCard";
import CardVerified from "./components/PaymentProcessing/CardVerified";
import OrderSuccessful from "./components/PaymentProcessing/OrderSuccessful";
import PaymentProcessing from "./pages/PaymentProcessing";
import SendOtp from "./pages/SendOtp";
import CheckoutProvider from "./contexts/checkout/CheckoutProvider";
import AuthProvider from "./contexts/auth/AuthProvider";
import OrderUnsuccessful from "./components/PaymentProcessing/OrderUnsuccessful";
import SomethingWentWrong from "./components/SomethingWentWrong";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileOrderDetails from "./components/OrderDetails/MobileOrderDetails";
import PaymentProvider from "./contexts/payment/PaymentProvider";
import ReviewPayment from "./components/ReviewOrderInformation/ReviewPayment";
import SessionTimedOut from "./components/PaymentProcessing/SessionTimedOut";
import CardVerificationFailed from "./components/PaymentProcessing/CardVerificationFailed";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isInactive, setIsInactive] = useState(false);
  const inactivityTime = 630 * 1000; // 10 minutes 30 seconds

  let timeout;

  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsInactive(true); // Set inactive state after 10 minutes
    }, inactivityTime);
  };

  const handleUserActivity = () => {
    setIsInactive(false); // Reset inactivity state
    resetTimer(); // Reset the timer on user activity
  };

  useEffect(() => {
    // Event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    // Start the timer on component mount
    resetTimer();

    return () => {
      // Cleanup event listeners and timer on unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isInactive) {
      const token = localStorage.getItem("checkout_token");
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v2/checkout/check_user_session`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("session status:", response?.data?.session_status);

          if (!response?.data?.session_status) {
            setTimeout(() => {
              window.location.href = "/session-expired";
            }, 1000);
          } else {
            resetTimer();
            setIsInactive(false);
          }
        })
        .catch((error) => {
          console.error("checkout session api error:", error);
        });
    }
  }, [isInactive]);

  // Redirect to root route on page reload
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    if (
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "reload"
    ) {
      window.location.href = "/";
    }
  });

  return (
    <Router>
      <CheckoutProvider>
        <AuthProvider>
          <PaymentProvider>
            <div className="sm:w-[839px] bg-veryLightGray mx-auto w-full overflow-hidden">
              <Navbar />
              <div className="block sm:hidden">
                <MobileOrderDetails />
              </div>
              <div className="w-full sm:py-6 py-3 sm:px-[10px] flex flex-col gap-8 z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/verify-code" element={<VerificationCode />} />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute element={<PaymentInformation />} />
                    }
                  />
                  <Route path="/review" element={<ReviewPayment />} />
                  <Route
                    path="/payment/processing"
                    element={<PaymentProcessing />}
                  />
                  <Route path="/payment/verify-card" element={<VerifyCard />} />
                  <Route path="/payment/verified" element={<CardVerified />} />
                  <Route
                    path="/payment/verification-failed"
                    element={<CardVerificationFailed />}
                  />
                  <Route
                    path="/payment/success"
                    element={<OrderSuccessful />}
                  />
                  <Route
                    path="/payment/failure"
                    element={<OrderUnsuccessful />}
                  />
                  <Route path="/send-otp" element={<SendOtp />} />
                  <Route path="/error" element={<SomethingWentWrong />} />
                  <Route
                    path="/session-expired"
                    element={<SessionTimedOut />}
                  />
                </Routes>
              </div>
              <Footer />
              {/* <ToastContainer /> */}
            </div>
          </PaymentProvider>
        </AuthProvider>
      </CheckoutProvider>
    </Router>
  );
}

export default App;
