import React from "react";

const Footer = () => {
  return (
    <div className="w-full sm:h-[138px] h-[181px] flex flex-col gap-3 items-center sm:justify-start justify-center">
      <div className="w-[267px] flex flex-col gap-1 justify-center items-center sm:mt-8 mt-0">
        <div>
          <img src="/nano-footer-logo.svg" alt="NanoKard Footer Logo" />
        </div>
        <p className="text-sm font-semibold text-mediumGray">
          Secure checkout powered by NanoKard
        </p>
      </div>
      <div className="w-full flex flex-col md:w-[435px] md:flex-row md:h-[19px] gap-2 justify-center items-center">
        <span className="active-blue">How does NanoKard work?</span>
        <span className="hidden md:block text-spanishGray">|</span>
        <div className="flex md:flex-row gap-2">
          <a
            className="active-blue"
            href="https://www.nanokard.com/terms-of-service-consumers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <span className="text-spanishGray">|</span>
          <a
            className="active-blue"
            href="https://www.nanokard.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
