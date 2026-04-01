import React from "react";
import styles from "../RightPanel.module.css";

export default function ImageFeatures({
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
        accept="image/*"
        onChange={handleFileUpload}
      />
      <button
        className={styles.uploadBtn}
        onClick={() => fileInputRef.current.click()}
      >
        Replace Image
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
            placeholder="e.g. 50% or 300px"
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
            placeholder="e.g. auto or 200px"
          />
        </div>
      </div>

      <div className={styles.row}>
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
        <div className={styles.inputGroup}>
          <label>Opacity</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            className={styles.inputField}
            value={selectedItem.styles.opacity ?? 1}
            onChange={(e) =>
              updateItem(selectedItem.id, "opacity", e.target.value, "styles")
            }
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Object Fit (Cropping)</label>
        <select
          className={styles.selectField}
          value={selectedItem.styles.objectFit || "cover"}
          onChange={(e) =>
            updateItem(selectedItem.id, "objectFit", e.target.value, "styles")
          }
        >
          <option value="cover">Cover (Fills Area)</option>
          <option value="contain">Contain (Shows Whole Image)</option>
          <option value="fill">Fill (Stretches)</option>
        </select>
      </div>
    </>
  );
}
