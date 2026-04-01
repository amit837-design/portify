import React, { useState, useRef } from "react";
import globalStyles from "../RightPanel.module.css";
import styles from "./FeatureTemplates.module.css";

export default function HeroFeatures({ selectedItem, updateItem }) {
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

        <div
          className={`${styles.templateCard} ${props.variant === "style1" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style1")}
        >
          <div className={styles.cardTitle}>Centered Hero</div>
          <div
            className={styles.wireRow}
            style={{
              flexDirection: "column",
              height: "50px",
              justifyContent: "center",
            }}
          >
            <div
              className={styles.wireText}
              style={{ width: "60%", height: "6px" }}
            ></div>
            <div
              className={styles.wireBox}
              style={{ width: "40%", height: "4px" }}
            ></div>
            <div
              className={styles.wirePrimary}
              style={{ width: "25px", height: "8px", marginTop: "2px" }}
            ></div>
          </div>
        </div>

        <div
          className={`${styles.templateCard} ${props.variant === "style2" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style2")}
        >
          <div className={styles.cardTitle}>Split Layout</div>
          <div
            className={styles.wireRow}
            style={{ height: "50px", justifyContent: "space-between" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "50%",
              }}
            >
              <div
                className={styles.wireText}
                style={{ width: "80%", height: "6px" }}
              ></div>
              <div
                className={styles.wireBox}
                style={{ width: "60%", height: "4px" }}
              ></div>
              <div
                className={styles.wirePrimary}
                style={{ width: "25px", height: "8px" }}
              ></div>
            </div>
            <div
              className={styles.wireBox}
              style={{ width: "35%", height: "100%" }}
            ></div>
          </div>
        </div>

        <div
          className={`${styles.templateCard} ${props.variant === "style3" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style3")}
        >
          <div className={styles.cardTitle}>Bold Minimal</div>
          <div
            className={styles.wireRow}
            style={{
              flexDirection: "column",
              height: "50px",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <div
              className={styles.wireText}
              style={{ width: "70%", height: "8px" }}
            ></div>
            <div
              className={styles.wirePrimary}
              style={{ width: "30px", height: "10px" }}
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

      <div className={globalStyles.inputGroup}>
        <label>Section Background</label>
        <div className={globalStyles.colorPickerWrap}>
          <input
            type="color"
            className={globalStyles.nativeColor}
            value={props.bgColor || "#ff5c00"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "bgColor",
                e.target.value,
                "customProps",
              )
            }
          />
          <input
            type="text"
            className={globalStyles.inputField}
            value={props.bgColor || "#ff5c00"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "bgColor",
                e.target.value,
                "customProps",
              )
            }
            style={{ border: "none" }}
          />
        </div>
      </div>

      <hr style={{ borderColor: "#333", margin: "16px 0" }} />
      <div className={globalStyles.inputGroup}>
        <label>Main Headline</label>
        <textarea
          className={globalStyles.inputField}
          rows={2}
          value={props.title || ""}
          onChange={(e) =>
            updateItem(selectedItem.id, "title", e.target.value, "customProps")
          }
        />
      </div>

      {/* DYNAMIC: Hide Subtitle if Template is Style 3 */}
      {props.variant !== "style3" && (
        <div className={globalStyles.inputGroup}>
          <label>Subheadline</label>
          <textarea
            className={globalStyles.inputField}
            rows={3}
            value={props.subtitle || ""}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "subtitle",
                e.target.value,
                "customProps",
              )
            }
          />
        </div>
      )}

      {/* DYNAMIC: Show Image Uploader if Template is Style 2 */}
      {props.variant === "style2" && (
        <>
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
            style={{ width: "100%", marginBottom: "16px" }}
          >
            Upload Hero Image
          </button>
        </>
      )}

      <hr style={{ borderColor: "#333", margin: "16px 0" }} />
      <div className={globalStyles.inputGroup}>
        <label>Button Text</label>
        <input
          type="text"
          className={globalStyles.inputField}
          value={props.btnText || ""}
          onChange={(e) =>
            updateItem(
              selectedItem.id,
              "btnText",
              e.target.value,
              "customProps",
            )
          }
        />
      </div>

      <div className={globalStyles.row}>
        <div className={globalStyles.inputGroup}>
          <label>Button Bg</label>
          <input
            type="color"
            className={globalStyles.nativeColor}
            value={props.btnBg || "#000000"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "btnBg",
                e.target.value,
                "customProps",
              )
            }
          />
        </div>
        <div className={globalStyles.inputGroup}>
          <label>Button Text Color</label>
          <input
            type="color"
            className={globalStyles.nativeColor}
            value={props.btnColor || "#ffffff"}
            onChange={(e) =>
              updateItem(
                selectedItem.id,
                "btnColor",
                e.target.value,
                "customProps",
              )
            }
          />
        </div>
      </div>
    </>
  );
}
