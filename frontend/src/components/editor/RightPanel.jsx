import React, { useRef } from "react";
import styles from "./RightPanel.module.css";
import SharedPosition from "./RightPanelFeatures/SharedPosition";
import TextFeatures from "./RightPanelFeatures/TextFeatures";
import ImageFeatures from "./RightPanelFeatures/ImageFeatures";
import VideoFeatures from "./RightPanelFeatures/VideoFeatures";
import NavbarFeatures from "./RightPanelFeatures/NavbarFeatures";
import HeroFeatures from "./RightPanelFeatures/HeroFeatures";
import AboutFeatures from "./RightPanelFeatures/AboutFeatures";
import FooterFeatures from "./RightPanelFeatures/FooterFeatures";

const SECTION_TYPES = ["Navbar", "Hero", "About", "Footer"];

export default function RightPanel({
  width,
  startResize,
  activeTool,
  canvasBg,
  setCanvasBg,
  selectedItem,
  updateItem,
  viewMode,
  deleteItem,
}) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedItem)
      updateItem(selectedItem.id, "content", URL.createObjectURL(file));
  };

  const renderSettings = () => {
    if (activeTool === "Background") {
      return (
        <div style={{ padding: "20px" }}>
          <div className={styles.inputGroup}>
            <label>Canvas Color</label>
            <div className={styles.colorPickerWrap}>
              <input
                type="color"
                value={canvasBg}
                onChange={(e) => setCanvasBg(e.target.value)}
                className={styles.nativeColor}
              />
              <input
                type="text"
                className={styles.inputField}
                value={canvasBg}
                onChange={(e) => setCanvasBg(e.target.value)}
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (!selectedItem)
      return (
        <div style={{ color: "#888", fontSize: 13, padding: "20px" }}>
          Select an element on the canvas to edit.
        </div>
      );

    const activeItem = {
      ...selectedItem,
      styles:
        viewMode === "mobile"
          ? { ...selectedItem.styles, ...selectedItem.mobileStyles }
          : selectedItem.styles,
    };
    const isSection = SECTION_TYPES.includes(activeItem.type);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Scrollable Features Area */}
        <div className={styles.scrollArea}>
          <SharedPosition
            selectedItem={activeItem}
            updateItem={updateItem}
            isSection={isSection}
          />
          {activeTool === "Text" && (
            <TextFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
            />
          )}
          {activeTool === "Image" && (
            <ImageFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
            />
          )}
          {activeTool === "Video" && (
            <VideoFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
            />
          )}
          {activeTool === "Navbar" && (
            <NavbarFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
            />
          )}
          {activeTool === "Hero" && (
            <HeroFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
            />
          )}
          {activeTool === "About" && (
            <AboutFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
            />
          )}
          {activeTool === "Footer" && (
            <FooterFeatures
              key={activeItem.id}
              selectedItem={activeItem}
              updateItem={updateItem}
            />
          )}
        </div>

        {/* FIXED: Delete Button fixed to the bottom, outside the scroll area */}
        <div
          style={{
            padding: "15px 20px",
            borderTop: "1px solid #333",
            background: "#111",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => deleteItem(selectedItem.id)}
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255, 68, 68, 0.1)",
              border: "1px solid #ff4444",
              color: "#ff4444",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#ff4444";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255, 68, 68, 0.1)";
              e.target.style.color = "#ff4444";
            }}
          >
            Delete Element
          </button>
        </div>
      </div>
    );
  };

  return (
    <aside className={styles.rightPanel} style={{ width }}>
      <div className={styles.resizerL} onMouseDown={startResize}></div>
      <div className={styles.title}>
        {activeTool} Settings{" "}
        <span style={{ color: "var(--primary)" }}>({viewMode})</span>
      </div>
      {renderSettings()}
    </aside>
  );
}
