import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styles from "./ToolCard.module.css";

export default function ToolCard({ icon, label, isActive, onClick }) {
  // 1. Setup the drag hook (Using the label as the unique ID)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: label,
  });

  // 2. Apply movement styles while dragging
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 100, // Keep it above other elements
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${styles.toolCard} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {icon}
      <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
    </div>
  );
}
