import React from "react";

export default function HeroRender({ cProps, viewMode }) {
  const isMobile = viewMode === "mobile";

  const renderContent = (align = "center") => (
    <>
      <h1
        style={{
          fontSize: isMobile ? "2rem" : "3.5rem",
          color: "#fff",
          margin: "0 0 15px 0",
          fontWeight: 800,
          lineHeight: 1.2,
        }}
      >
        {cProps.title}
      </h1>
      {cProps.variant !== "style3" && (
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            color: "rgba(255,255,255,0.8)",
            margin: "0 0 30px 0",
            maxWidth: "600px",
            lineHeight: 1.6,
          }}
        >
          {cProps.subtitle}
        </p>
      )}
      <button
        style={{
          background: cProps.btnBg,
          color: cProps.btnColor,
          padding: isMobile ? "12px 24px" : "14px 32px",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          alignSelf: align === "center" ? "center" : "flex-start",
        }}
      >
        {cProps.btnText}
      </button>
    </>
  );

  if (cProps.variant === "style1") {
    return (
      <div
        style={{
          width: "100%",
          background: cProps.bgColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: isMobile ? "60px 20px" : "100px 40px",
        }}
      >
        {renderContent("center")}
      </div>
    );
  }

  if (cProps.variant === "style2") {
    return (
      <div
        style={{
          width: "100%",
          background: cProps.bgColor,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "50px 20px" : "80px 60px",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            textAlign: isMobile ? "center" : "left",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {renderContent(isMobile ? "center" : "left")}
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            aspectRatio: "16/9",
            background: cProps.image
              ? `url(${cProps.image}) center/cover`
              : "rgba(0,0,0,0.1)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: cProps.image ? "none" : "2px dashed rgba(255,255,255,0.2)",
          }}
        >
          {!cProps.image && (
            <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
              Image Placeholder
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        background: cProps.bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textAlign: "left",
        padding: isMobile ? "60px 20px" : "120px 60px",
      }}
    >
      <div style={{ maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: isMobile ? "2.2rem" : "5rem",
            color: "#fff",
            margin: "0 0 20px 0",
            fontWeight: 900,
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          {cProps.title}
        </h1>
        <button
          style={{
            background: cProps.btnBg,
            color: cProps.btnColor,
            padding: isMobile ? "12px 24px" : "16px 40px",
            border: "none",
            borderRadius: "50px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {cProps.btnText}
        </button>
      </div>
    </div>
  );
}
