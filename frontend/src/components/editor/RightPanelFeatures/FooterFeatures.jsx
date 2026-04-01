import React, { useState } from "react";
import globalStyles from "../RightPanel.module.css";
import styles from "./FeatureTemplates.module.css";

export default function FooterFeatures({ selectedItem, updateItem }) {
  const [step, setStep] = useState("template");
  const props = selectedItem.customProps || {};
  const links = props.links || [];

  const handleSelectTemplate = (variant) => {
    updateItem(selectedItem.id, "variant", variant, "customProps");
    setStep("customize");
  };

  const updateLink = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateItem(selectedItem.id, "links", newLinks, "customProps");
  };

  if (step === "template") {
    return (
      <div className={styles.templateContainer}>
        <label className={styles.templateLabel}>Choose a Template</label>

        <div
          className={`${styles.templateCard} ${props.variant === "style1" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style1")}
        >
          <div className={styles.cardTitle}>Split Layout</div>
          <div
            className={styles.wireRow}
            style={{ justifyContent: "space-between", height: "35px" }}
          >
            <div
              className={styles.wireText}
              style={{ width: "40%", height: "4px" }}
            ></div>
            <div style={{ display: "flex", gap: "6px" }}>
              <div
                className={styles.wireBox}
                style={{ width: "12px", height: "4px" }}
              ></div>
              <div
                className={styles.wireBox}
                style={{ width: "12px", height: "4px" }}
              ></div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.templateCard} ${props.variant === "style2" ? styles.active : ""}`}
          onClick={() => handleSelectTemplate("style2")}
        >
          <div className={styles.cardTitle}>Centered Stack</div>
          <div
            className={styles.wireRow}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "45px",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
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
              className={styles.wireText}
              style={{ width: "50%", height: "4px" }}
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
            value={props.bgColor || "#050505"}
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
            value={props.textColor || "#888888"}
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

      <div className={globalStyles.inputGroup}>
        <label>Copyright Text</label>
        <input
          type="text"
          className={globalStyles.inputField}
          value={props.text || ""}
          onChange={(e) =>
            updateItem(selectedItem.id, "text", e.target.value, "customProps")
          }
        />
      </div>

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
        Social Links
      </label>

      {links.map((link, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: "12px",
            background: "#222",
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Label"
              className={globalStyles.inputField}
              value={link.label || ""}
              onChange={(e) => updateLink(i, "label", e.target.value)}
              style={{ padding: "6px" }}
            />
            <button
              onClick={() =>
                updateItem(
                  selectedItem.id,
                  "links",
                  links.filter((_, idx) => idx !== i),
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
          <input
            type="url"
            placeholder="https://..."
            className={globalStyles.inputField}
            value={link.url || ""}
            onChange={(e) => updateLink(i, "url", e.target.value)}
            style={{ padding: "6px", fontSize: "0.8rem", color: "#aaa" }}
          />
        </div>
      ))}

      <button
        className={globalStyles.uploadBtn}
        onClick={() =>
          updateItem(
            selectedItem.id,
            "links",
            [...links, { label: "New Link", url: "#" }],
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
