import React from "react";
import styles from "../RightPanel.module.css";

export default function TextFeatures({ selectedItem, updateItem }) {
  return (
    <>
      <div className={styles.inputGroup}>
        <label>Content</label>
        <textarea
          className={styles.inputField}
          rows={3}
          value={selectedItem.content || ""}
          onChange={(e) =>
            updateItem(selectedItem.id, "content", e.target.value)
          }
          placeholder="Type your text here..."
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Width</label>
          {/* FIXED: Passed "styles" to the brain so it accepts the change */}
          <input
            type="text"
            className={styles.inputField}
            value={selectedItem.styles.width || ""}
            onChange={(e) =>
              updateItem(selectedItem.id, "width", e.target.value, "styles")
            }
            placeholder="e.g. 100% or auto"
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
            placeholder="e.g. auto"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Size</label>
          <input
            type="text"
            className={styles.inputField}
            value={selectedItem.styles.fontSize || ""}
            onChange={(e) =>
              updateItem(selectedItem.id, "fontSize", e.target.value, "styles")
            }
            placeholder="e.g. 16px, 2rem"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Weight</label>
          <select
            className={styles.selectField}
            value={selectedItem.styles.fontWeight || "normal"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "fontWeight",
                e.target.value,
                "styles",
              )
            }
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="800">Extra Bold</option>
            <option value="300">Light</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Align</label>
          <select
            className={styles.selectField}
            value={selectedItem.styles.textAlign || "left"}
            onChange={(e) =>
              updateItem(selectedItem.id, "textAlign", e.target.value, "styles")
            }
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Color</label>
          <input
            type="color"
            className={styles.nativeColor}
            value={selectedItem.styles.color || "#000000"}
            onChange={(e) =>
              updateItem(selectedItem.id, "color", e.target.value, "styles")
            }
          />
        </div>
      </div>
    </>
  );
}
