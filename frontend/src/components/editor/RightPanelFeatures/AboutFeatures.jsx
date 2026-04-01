import React, { useState, useRef } from "react";
import globalStyles from "../RightPanel.module.css";
import styles from "./FeatureTemplates.module.css";

export default function AboutFeatures({ selectedItem, updateItem }) {
  const [step, setStep] = useState("template");
  const props = selectedItem.customProps || {};
  const fileInputRef = useRef(null);

  const handleSelectTemplate = (variant) => {
    updateItem(selectedItem.id, "variant", variant, "customProps");
    setStep("customize");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file)
      updateItem(
        selectedItem.id,
        "image",
        URL.createObjectURL(file),
        "customProps",
      );
  };

  if (step === "template") {
    return (
      <div className={styles.templateContainer}>
        <label className={styles.templateLabel}>Choose a Template</label>

        {/* Template 1: Split View (Image Left, Text Right) */}
        <div
          className={`${styles.templateCard} ${props.variant === "style1" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style1")}
        >
          <div className={styles.cardTitle}>Split View</div>
          <div
            className={styles.wireRow}
            style={{ height: "60px", padding: "5px", gap: "10px" }}
          >
            <div
              className={styles.wireBox}
              style={{ width: "40%", height: "100%" }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                width: "60%",
                justifyContent: "center",
              }}
            >
              <div
                className={styles.wireText}
                style={{ width: "80%", height: "8px" }}
              ></div>
              <div
                className={styles.wireText}
                style={{ width: "100%", height: "4px" }}
              ></div>
              <div
                className={styles.wireText}
                style={{ width: "60%", height: "4px" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Template 2: Centered */}
        <div
          className={`${styles.templateCard} ${props.variant === "style2" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style2")}
        >
          <div className={styles.cardTitle}>Centered Minimal</div>
          <div
            className={styles.wireRow}
            style={{
              height: "60px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              className={styles.wireText}
              style={{ width: "50%", height: "8px" }}
            ></div>
            <div
              className={styles.wireText}
              style={{ width: "80%", height: "4px" }}
            ></div>
            <div
              className={styles.wireText}
              style={{ width: "60%", height: "4px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button className={styles.backBtn} onClick={() => setStep("template")}>
        ⬅ Change Template
      </button>

      <div className={globalStyles.row}>
        <div className={globalStyles.inputGroup}>
          <label>Background</label>
          <input
            type="color"
            className={globalStyles.nativeColor}
            value={props.bgColor || "#ffffff"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "bgColor",
                e.target.value,
                "customProps",
              )
            }
          />
        </div>
        <div className={globalStyles.inputGroup}>
          <label>Text Color</label>
          <input
            type="color"
            className={globalStyles.nativeColor}
            value={props.textColor || "#333333"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "textColor",
                e.target.value,
                "customProps",
              )
            }
          />
        </div>
      </div>

      <hr style={{ borderColor: "#333", margin: "16px 0" }} />
      <div className={globalStyles.inputGroup}>
        <label>Heading</label>
        <input
          type="text"
          className={globalStyles.inputField}
          value={props.title || ""}
          onChange={(e) =>
            updateItem(selectedItem.id, "title", e.target.value, "customProps")
          }
        />
      </div>

      <div className={globalStyles.inputGroup}>
        <label>Biography</label>
        <textarea
          className={globalStyles.inputField}
          rows={5}
          value={props.description || ""}
          onChange={(e) =>
            updateItem(
              selectedItem.id,
              "description",
              e.target.value,
              "customProps",
            )
          }
        />
      </div>

      {props.variant === "style1" && (
        <>
          <hr style={{ borderColor: "#333", margin: "16px 0" }} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            className={globalStyles.uploadBtn}
            onClick={() => fileInputRef.current.click()}
            style={{ width: "100%" }}
          >
            Replace Profile Image
          </button>
        </>
      )}
    </>
  );
}
