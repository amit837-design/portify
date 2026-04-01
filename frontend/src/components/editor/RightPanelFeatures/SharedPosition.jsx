import React from "react";
import styles from "../RightPanel.module.css";

export default function SharedPosition({
  selectedItem,
  updateItem,
  isSection,
}) {
  return (
    <>
      {/* FIXED: Hides X and Y for Navbars, Heros, etc. so they stay full width! */}
      {!isSection && (
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>X (Left)</label>
            <input
              type="text"
              className={styles.inputField}
              value={selectedItem.styles.left || ""}
              onChange={(e) =>
                updateItem(selectedItem.id, "left", e.target.value, "styles")
              }
              placeholder="e.g. 10% or 50px"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Y (Top)</label>
            <input
              type="text"
              className={styles.inputField}
              value={selectedItem.styles.top || ""}
              onChange={(e) =>
                updateItem(selectedItem.id, "top", e.target.value, "styles")
              }
              placeholder="e.g. 20% or 100px"
            />
          </div>
        </div>
      )}

      {/* Z-Index is helpful for both absolute elements and sections */}
      <div className={styles.inputGroup}>
        <label>Z-Index</label>
        <input
          type="number"
          className={styles.inputField}
          value={selectedItem.styles.zIndex || ""}
          onChange={(e) =>
            updateItem(selectedItem.id, "zIndex", e.target.value, "styles")
          }
          placeholder="1"
        />
      </div>
      <hr style={{ borderColor: "#333", margin: "16px 0" }} />
    </>
  );
}
