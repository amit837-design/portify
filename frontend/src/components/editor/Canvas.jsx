import React from "react";
import { useDroppable } from "@dnd-kit/core";
import CanvasItem from "./CanvasItem";
import styles from "./Canvas.module.css";

export default function Canvas({
  viewMode,
  isDragging,
  mobileCanvasW,
  startCanvasResize,
  canvasBg,
  droppedItems,
  selectedItemId,
  setSelectedItemId,
  setActiveTool,
  updateItem,
}) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas-board" });

  const handleSelect = (item) => {
    setSelectedItemId(item.id);
    setActiveTool(item.type);
  };

  return (
    <main className={styles.canvasArea} onClick={() => setSelectedItemId(null)}>
      <div
        ref={setNodeRef}
        className={`
          ${styles.canvasBoard} 
          ${viewMode === "mobile" ? styles.mobile : ""} 
          ${isOver ? styles.isDragOver : ""}
        `}
        style={{
          width: viewMode === "desktop" ? "95%" : `${mobileCanvasW}px`,
          maxWidth: viewMode === "desktop" ? "1400px" : "none",
          backgroundColor: canvasBg,
        }}
      >
        {viewMode === "mobile" && (
          <div
            className={styles.mobileGrip}
            onMouseDown={startCanvasResize}
            title="Drag to Resize"
          />
        )}

        <div className={styles.canvasContent}>
          {droppedItems.length === 0 && !isOver && (
            <div className={styles.emptyState}>
              <h3>Drop Components Here</h3>
            </div>
          )}

          {droppedItems.map((item) => (
            <CanvasItem
              key={item.id}
              item={item}
              isSelected={item.id === selectedItemId}
              onSelect={handleSelect}
              updateItem={updateItem}
              viewMode={viewMode} /* <-- CRITICAL FIX: Passing the state down */
            />
          ))}
        </div>
      </div>
    </main>
  );
}
