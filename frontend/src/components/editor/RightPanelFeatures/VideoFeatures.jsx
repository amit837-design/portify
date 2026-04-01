import React from "react";
import styles from "../RightPanel.module.css";

export default function VideoFeatures({
  selectedItem,
  updateItem,
  fileInputRef,
  handleFileUpload,
}) {
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="video/*"
        onChange={handleFileUpload}
      />
      <button
        className={styles.uploadBtn}
        onClick={() => fileInputRef.current.click()}
      >
        Replace Video
      </button>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Width</label>
          {/* FIXED: "styles" string added */}
          <input
            type="text"
            className={styles.inputField}
            value={selectedItem.styles.width || ""}
            onChange={(e) =>
              updateItem(selectedItem.id, "width", e.target.value, "styles")
            }
            placeholder="e.g. 50% or 500px"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Height</label>
          <input
            type="text"
            className={styles.inputField}
            value={selectedItem.styles.height || ""}
            onChange={(e) =>
              updateItem(selectedItem.id, "height", e.target.value, "styles")
            }
            placeholder="e.g. auto or 300px"
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Radius</label>
        <input
          type="text"
          className={styles.inputField}
          value={selectedItem.styles.borderRadius || ""}
          onChange={(e) =>
            updateItem(
              selectedItem.id,
              "borderRadius",
              e.target.value,
              "styles",
            )
          }
          placeholder="e.g. 12px or 50%"
        />
      </div>

      <div className={styles.row}>
        <label
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "0.8rem",
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={selectedItem.autoPlay || false}
            onChange={(e) =>
              updateItem(selectedItem.id, "autoPlay", e.target.checked)
            }
          />
          Autoplay
        </label>
        <label
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "0.8rem",
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={selectedItem.loop || false}
            onChange={(e) =>
              updateItem(selectedItem.id, "loop", e.target.checked)
            }
          />
          Loop
        </label>
        <label
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "0.8rem",
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={selectedItem.muted || false}
            onChange={(e) =>
              updateItem(selectedItem.id, "muted", e.target.checked)
            }
          />
          Muted
        </label>
      </div>
    </>
  );
}
