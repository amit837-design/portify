import React from "react";

export default function AboutRender({ cProps, viewMode }) {
  const isMobile = viewMode === "mobile";

  if (cProps.variant === "style1") {
    return (
      <div
        style={{
          width: "100%",
          background: cProps.bgColor,
          color: cProps.textColor,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "50px 20px" : "80px 10%",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            aspectRatio: "1/1",
            maxWidth: isMobile ? "250px" : "400px",
            background: cProps.image
              ? `url(${cProps.image}) center/cover`
              : "#eee",
            borderRadius: "16px",
            border: cProps.image ? "none" : "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!cProps.image && (
            <span style={{ color: "#999", fontWeight: 600 }}>
              Profile Image
            </span>
          )}
        </div>
        <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
          <h2
            style={{
              fontSize: isMobile ? "1.8rem" : "3rem",
              margin: "0 0 20px 0",
              fontWeight: 800,
            }}
          >
            {cProps.title}
          </h2>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              lineHeight: 1.6,
              opacity: 0.8,
              margin: 0,
            }}
          >
            {cProps.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        background: cProps.bgColor,
        color: cProps.textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: isMobile ? "60px 20px" : "100px 20px",
      }}
    >
      <div style={{ maxWidth: "700px" }}>
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "3rem",
            margin: "0 0 20px 0",
            fontWeight: 800,
          }}
        >
          {cProps.title}
        </h2>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            lineHeight: 1.8,
            opacity: 0.8,
            margin: 0,
          }}
        >
          {cProps.description}
        </p>
      </div>
    </div>
  );
}
