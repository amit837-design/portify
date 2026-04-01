import React, { useState } from "react";
import globalStyles from "../RightPanel.module.css";
import styles from "./FeatureTemplates.module.css";

export default function NavbarFeatures({ selectedItem, updateItem }) {
  const [step, setStep] = useState("template");
  const props = selectedItem.customProps || {};

  const handleSelectTemplate = (variant) => {
    updateItem(selectedItem.id, "variant", variant, "customProps");
    setStep("customize");
  };

  if (step === "template") {
    return (
      <div className={styles.templateContainer}>
        <label className={styles.templateLabel}>Choose a Template</label>

        <div
          className={`${styles.templateCard} ${props.variant === "style1" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style1")}
        >
          <div className={styles.cardTitle}>Classic Navbar</div>
          <div
            className={styles.wireRow}
            style={{ justifyContent: "space-between" }}
          >
            <div
              className={styles.wireText}
              style={{ width: "30px", height: "6px" }}
            ></div>
            <div style={{ display: "flex", gap: "4px" }}>
              <div
                className={styles.wireBox}
                style={{ width: "15px", height: "4px" }}
              ></div>
              <div
                className={styles.wireBox}
                style={{ width: "15px", height: "4px" }}
              ></div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.templateCard} ${props.variant === "style2" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style2")}
        >
          <div className={styles.cardTitle}>Split with Button</div>
          <div
            className={styles.wireRow}
            style={{ justifyContent: "space-between" }}
          >
            <div
              className={styles.wireText}
              style={{ width: "20px", height: "6px" }}
            ></div>
            <div style={{ display: "flex", gap: "4px" }}>
              <div
                className={styles.wireBox}
                style={{ width: "15px", height: "4px" }}
              ></div>
              <div
                className={styles.wireBox}
                style={{ width: "15px", height: "4px" }}
              ></div>
            </div>
            <div
              className={styles.wirePrimary}
              style={{ width: "25px", height: "10px" }}
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
        <label>Logo Text</label>
        <input
          type="text"
          className={globalStyles.inputField}
          value={props.logo || ""}
          onChange={(e) =>
            updateItem(selectedItem.id, "logo", e.target.value, "customProps")
          }
        />
      </div>

      <div className={globalStyles.row}>
        <div className={globalStyles.inputGroup}>
          <label>Background</label>
          <input
            type="color"
            className={globalStyles.nativeColor}
            value={props.bgColor || "#111111"}
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
            value={props.textColor || "#ffffff"}
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

      {props.variant === "style2" && (
        <div className={globalStyles.row}>
          <div className={globalStyles.inputGroup}>
            <label>CTA Button</label>
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
          <div className={globalStyles.inputGroup}>
            <label>CTA Color</label>
            <input
              type="color"
              className={globalStyles.nativeColor}
              value={props.btnBg || "#ff5c00"}
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
        </div>
      )}

      <hr style={{ borderColor: "#333", margin: "16px 0" }} />
      <label
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#888",
          textTransform: "uppercase",
          marginBottom: "10px",
          display: "block",
        }}
      >
        Navigation Links
      </label>
      {props.links?.map((link, i) => (
        <div
          key={i}
          style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
        >
          <input
            type="text"
            className={globalStyles.inputField}
            value={link}
            onChange={(e) => {
              const newLinks = [...props.links];
              newLinks[i] = e.target.value;
              updateItem(selectedItem.id, "links", newLinks, "customProps");
            }}
          />
          <button
            onClick={() =>
              updateItem(
                selectedItem.id,
                "links",
                props.links.filter((_, idx) => idx !== i),
                "customProps",
              )
            }
            style={{
              background: "#ff4444",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "0 10px",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      ))}
      <button
        className={globalStyles.uploadBtn}
        onClick={() =>
          updateItem(
            selectedItem.id,
            "links",
            [...(props.links || []), "New Link"],
            "customProps",
          )
        }
        style={{ width: "100%", marginTop: "8px" }}
      >
        + Add Link
      </button>
    </>
  );
}
