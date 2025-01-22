import { toast } from "react-toastify";

const showToast = (type, message) => {
  toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showSuccessToast = (message) => showToast("success", message);
export const showErrorToast = (message) => showToast("error", message);
