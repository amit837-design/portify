"use client";
import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Header.module.css";
import { IconText, IconImage, IconVideo, IconPalette } from "../ui/Icons";

const ELEMENTS = [
  { id: "Text", icon: <IconText /> },
  { id: "Image", icon: <IconImage /> },
  { id: "Video", icon: <IconVideo /> },
  { id: "Background", icon: <IconPalette />, noDrag: true },
];

const DraggableNavBtn = ({ el, activeTool, setActiveTool }) => {
  if (el.noDrag) {
    return (
      <div
        className={`${styles.elementBtn} ${activeTool === el.id ? styles.active : ""}`}
        onClick={() => setActiveTool(el.id)}
      >
        {el.icon} <span className={styles.btnText}>{el.id}</span>
      </div>
    );
  }

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: el.id,
  });
  const style = transform
    ? { transform: CSS.Translate.toString(transform), zIndex: 100 }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${styles.elementBtn} ${activeTool === el.id ? styles.active : ""}`}
      onClick={() => setActiveTool(el.id)}
    >
      {el.icon} <span className={styles.btnText}>{el.id}</span>
    </div>
  );
};

export default function Header({
  viewMode,
  setViewMode,
  activeTool,
  setActiveTool,
}) {
  const [user, setUser] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  // Fetch user profile on load
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      })
      .catch((err) => console.error("Not logged in"));
  }, []);

  const handleExport = async () => {
    setIsDeploying(true);
    try {
      const response = await fetch("http://localhost:5000/api/export/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CRITICAL: This sends the cookie to the backend
        credentials: "include",
        body: JSON.stringify({
          html: "<h1>Hello from Portify</h1>",
          css: "body { background: #000; color: #ff5c00; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }",
          js: "console.log('Site Loaded')",
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Deployment Successful! Opening your site...");
        window.open(data.url, "_blank");
      } else {
        alert("Deployment failed: " + data.message);
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.brandGroup}>
        <div className={styles.logo}>Portify</div>
        {user && user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className={styles.avatar}
            title={`Logged in as ${user.username}`}
            onError={(e) => {
              e.target.src = "https://github.com/identicons/jasonlong.png";
            }}
          />
        ) : null}
      </div>

      <div className={styles.headerCenter}>
        {ELEMENTS.map((el) => (
          <DraggableNavBtn
            key={el.id}
            el={el}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.viewGroup}>
          <button
            onClick={() => setViewMode("desktop")}
            className={`${styles.viewBtn} ${viewMode === "desktop" ? styles.active : ""}`}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`${styles.viewBtn} ${viewMode === "mobile" ? styles.active : ""}`}
          >
            Mobile
          </button>
        </div>

        <button
          onClick={handleExport}
          className={styles.exportBtn}
          disabled={isDeploying}
        >
          {isDeploying ? "Deploying..." : "Export"}
        </button>
      </div>
    </header>
  );
}
