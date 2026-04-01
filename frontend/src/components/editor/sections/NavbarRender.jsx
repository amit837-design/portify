import React, { useState, useEffect } from "react";

export default function NavbarRender({ cProps, viewMode }) {
  const isMobile = viewMode === "mobile";
  const links = cProps.links || [];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  // Handle Smooth Scroll Logic
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (isMobile) setIsMenuOpen(false);
  };

  const renderLogo = () => (
    <h2
      style={{
        fontSize: isMobile ? "1.3rem" : "1.6rem",
        margin: 0,
        fontWeight: 800,
        letterSpacing: "-0.5px",
      }}
    >
      {cProps.logo || "Logo"}
    </h2>
  );

  const renderLinks = (inMobileMenu = false) => (
    <div
      style={{
        display: "flex",
        flexDirection: inMobileMenu ? "column" : "row",
        gap: inMobileMenu ? "15px" : "24px",
        fontSize: inMobileMenu ? "1.1rem" : "0.95rem",
        fontWeight: 500,
        alignItems: inMobileMenu ? "flex-start" : "center",
      }}
    >
      {links.map((link, i) => (
        <a
          key={i}
          href={`#${link.targetId}`}
          onClick={(e) => handleScroll(e, link.targetId)}
          style={{
            cursor: "pointer",
            opacity: 0.8,
            textDecoration: "none",
            color: "inherit",
            transition: "opacity 0.2s",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );

  const renderButton = (inMobileMenu = false) => (
    <button
      style={{
        background: cProps.btnBg,
        color: cProps.btnColor,
        padding: isMobile ? "10px 20px" : "10px 24px",
        border: "none",
        borderRadius: "6px",
        fontSize: "0.95rem",
        fontWeight: "bold",
        cursor: "pointer",
        width: inMobileMenu ? "100%" : "auto",
        marginTop: inMobileMenu ? "10px" : "0",
      }}
    >
      {cProps.btnText || "Action"}
    </button>
  );

  const renderHamburger = () => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        cursor: "pointer",
        width: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "2.5px",
          background: cProps.textColor,
          borderRadius: "2px",
          transform: isMenuOpen ? "translateY(8.5px) rotate(45deg)" : "none",
          transition: "0.3s",
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "2.5px",
          background: cProps.textColor,
          borderRadius: "2px",
          opacity: isMenuOpen ? 0 : 1,
          transition: "0.3s",
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "2.5px",
          background: cProps.textColor,
          borderRadius: "2px",
          transform: isMenuOpen ? "translateY(-8.5px) rotate(-45deg)" : "none",
          transition: "0.3s",
        }}
      ></div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        background: cProps.bgColor,
        color: cProps.textColor,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: isMobile ? "65px" : "85px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 20px" : "0 5%",
        }}
      >
        {cProps.variant === "style1" ? (
          <>
            {renderLogo()}
            {isMobile ? renderHamburger() : renderLinks(false)}
          </>
        ) : (
          <>
            <div style={{ flex: 1 }}>{renderLogo()}</div>
            {!isMobile && (
              <div
                style={{ flex: 2, display: "flex", justifyContent: "center" }}
              >
                {renderLinks(false)}
              </div>
            )}
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              {!isMobile && renderButton(false)}
              {isMobile && renderHamburger()}
            </div>
          </>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <div
          style={{
            padding: "0 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {renderLinks(true)}
          {cProps.variant === "style2" && renderButton(true)}
        </div>
      )}
    </div>
  );
}
