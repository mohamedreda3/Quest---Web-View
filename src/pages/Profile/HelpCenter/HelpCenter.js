// HelpCenter.jsx
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaFacebook,
  FaWhatsapp,
  FaPhone,
  FaTelegramPlane,
  FaQuestionCircle,
} from "react-icons/fa";
import "./helpcenter.css";
import { getSups } from "./functions/getSup";

const HelpCenter = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [sups, setSups] = useState([]);

  useEffect(() => {
    getSups(setPageLoading, setSups);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Function to select the appropriate icon based on support type
  const getIcon = (type) => {
    switch (type) {
      case "facebook":
        return <FaFacebook className="support-icon facebook" />;
      case "whatsapp":
        return <FaWhatsapp className="support-icon whatsapp" />;
      case "phone":
        return <FaPhone className="support-icon phone" />;
      case "telegram":
        return <FaTelegramPlane className="support-icon telegram" />;
      default:
        return <FaQuestionCircle className="support-icon default" />;
    }
  };

  // Function to select display name based on support type
  const getDisplayName = (type) => {
    switch (type) {
      case "facebook":
        return "Facebook";
      case "whatsapp":
        return "WhatsApp";
      case "phone":
        return "Call Us";
      case "telegram":
        return "Telegram";
      default:
        return "Contact";
    }
  };

  return (
    <div className="help_center_page">
      {/* Header Section */}
      <header className="help_center_header">
        <h1 className="firstFont">Help Center</h1>
        <p className="secondFont">
          We are here to assist you. Choose a support channel below to get in
          touch with us.
        </p>
      </header>

      {/* Support Channels Section */}
      <section className="help_center_support">
        <h2 className="firstFont mainColor">Contact Us</h2>
        <div className="support_channels">
          {sups && sups.length > 0 ? (
            sups.map((sup) => (
              <a
                key={sup.id}
                href={sup.value}
                className="support_card bgMainColor text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getDisplayName(sup.type)}
              >
                <div className="support_icon">{getIcon(sup.type)}</div>
                <div
                  className="support_info"
                  style={{
                    minWidth: "145px",
                  }}
                >
                  <h3 className="firstFont font-extrabold">
                    {getDisplayName(sup.type)}
                  </h3>
                  <p className="thirdFont font-normal">
                    {sup.type === "phone"
                      ? "Call us directly."
                      : `Reach us on ${getDisplayName(sup.type)}.`}
                  </p>
                </div>
                <FaArrowRight className="support_arrow" />
              </a>
            ))
          ) : (
            <p>Loading support options...</p>
          )}
        </div>
      </section>

      {/* Optional: Additional Resources Section */}
      {/* <section className="help_center_resources">
        <h2>Frequently Asked Questions</h2>
        <!-- Add FAQ items here -->
      </section> */}
    </div>
  );
};

export default HelpCenter;
