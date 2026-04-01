import React from "react";

export default function FooterRender({ cProps, viewMode }) {
  const isMobile = viewMode === "mobile";
  const links = cProps.links || [];

  const renderLinks = () => (
    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            cursor: "pointer",
            fontSize: "0.9rem",
            color: cProps.textColor,
            textDecoration: "none",
          }}
        >
          {link.label || link}
        </a>
      ))}
    </div>
  );

  if (cProps.variant === "style1") {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "80px",
          background: cProps.bgColor,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          padding: isMobile ? "30px 20px" : "0 50px",
          gap: "15px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span style={{ color: cProps.textColor, fontSize: "0.9rem" }}>
          {cProps.text}
        </span>
        {renderLinks()}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "40px 20px",
        background: cProps.bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {renderLinks()}
      <span
        style={{ color: cProps.textColor, fontSize: "0.85rem", opacity: 0.6 }}
      >
        {cProps.text}
      </span>
    </div>
  );
}
