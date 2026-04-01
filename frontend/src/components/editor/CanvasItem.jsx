import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import NavbarRender from "./sections/NavbarRender";
import HeroRender from "./sections/HeroRender";
import AboutRender from "./sections/AboutRender";
import FooterRender from "./sections/FooterRender";

const SECTION_TYPES = ["Navbar", "Hero", "About", "Footer"];

export default function CanvasItem({
  item,
  isSelected,
  onSelect,
  updateItem,
  viewMode,
}) {
  const itemRef = useRef(null);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const setRefs = (node) => {
    setNodeRef(node);
    itemRef.current = node;
  };
  const activeStyles =
    viewMode === "mobile"
      ? { ...item.styles, ...item.mobileStyles }
      : item.styles;
  const cProps = item.customProps || {};
  const isSection = SECTION_TYPES.includes(item.type);
  const dragProps = isSection ? {} : { ...listeners, ...attributes };

  const style = {
    ...activeStyles,
    transform: isSection ? undefined : CSS.Translate.toString(transform),
    outline: isSelected ? "2px dotted var(--primary)" : "none",
    outlineOffset: "-2px",
    overflow: "visible",
    cursor: isSection ? "pointer" : "grab",
    boxSizing: "border-box",
    zIndex: activeStyles.zIndex || (isSelected ? 10 : 1),
    margin: 0,
    padding: 0,
  };

  const innerStyle = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: activeStyles.borderRadius,
  };
  const textBorderStyle =
    item.type === "Text" && !item.content && !isSelected
      ? { border: "1px dashed #ccc" }
      : {};

  const handleResize = (e, dir) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX,
      startY = e.clientY;
    const startW = itemRef.current.offsetWidth,
      startH = itemRef.current.offsetHeight;
    const startL = itemRef.current.offsetLeft,
      startT = itemRef.current.offsetTop;
    const pW = itemRef.current.parentElement.offsetWidth,
      pH = itemRef.current.parentElement.offsetHeight;

    const onMouseMove = (mE) => {
      let nW = startW,
        nH = startH,
        nL = startL,
        nT = startT;
      const dX = mE.clientX - startX,
        dY = mE.clientY - startY;

      if (dir.includes("e")) nW = startW + dX;
      if (dir.includes("s")) nH = startH + dY;
      if (dir.includes("w")) {
        nW = startW - dX;
        nL = startL + dX;
      }
      if (dir.includes("n")) {
        nH = startH - dY;
        nT = startT + dY;
      }

      if (dir.includes("e") || dir.includes("w"))
        updateItem(
          item.id,
          "width",
          `${((nW / pW) * 100).toFixed(2)}%`,
          "styles",
        );
      if (dir.includes("s") || dir.includes("n"))
        updateItem(
          item.id,
          "height",
          `${((nH / pH) * 100).toFixed(2)}%`,
          "styles",
        );
      if (dir.includes("w"))
        updateItem(
          item.id,
          "left",
          `${((nL / pW) * 100).toFixed(2)}%`,
          "styles",
        );
      if (dir.includes("n"))
        updateItem(
          item.id,
          "top",
          `${((nT / pH) * 100).toFixed(2)}%`,
          "styles",
        );
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleStyle = {
    position: "absolute",
    width: 10,
    height: 10,
    background: "var(--primary)",
    border: "1px solid #fff",
    borderRadius: "50%",
    zIndex: 20,
  };

  return (
    <div
      ref={setRefs}
      style={style}
      {...dragProps}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <div style={{ ...innerStyle, ...textBorderStyle }}>
        {item.type === "Text" && (
          <div style={{ width: "100%", height: "100%", padding: "4px 8px" }}>
            {item.content || "Double click right panel to edit text"}
          </div>
        )}
        {item.type === "Image" &&
          (item.content ? (
            <img
              src={item.content}
              style={{
                width: "100%",
                height: "100%",
                objectFit: activeStyles.objectFit || "cover",
                display: "block",
              }}
              alt="uploaded"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: 100,
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Image
            </div>
          ))}
        {item.type === "Video" &&
          (item.content ? (
            <video
              src={item.content}
              style={{
                width: "100%",
                height: "100%",
                objectFit: activeStyles.objectFit || "cover",
                display: "block",
              }}
              controls
              autoPlay={item.autoPlay}
              loop={item.loop}
              muted={item.muted}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: 100,
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Video
            </div>
          ))}

        {/* CRITICAL FIX: viewMode strictly passed to renderers */}
        {item.type === "Navbar" && (
          <NavbarRender cProps={cProps} viewMode={viewMode} />
        )}
        {item.type === "Hero" && (
          <HeroRender cProps={cProps} viewMode={viewMode} />
        )}
        {item.type === "About" && (
          <AboutRender cProps={cProps} viewMode={viewMode} />
        )}
        {item.type === "Footer" && (
          <FooterRender cProps={cProps} viewMode={viewMode} />
        )}
      </div>

      {isSelected && !isSection && (
        <>
          <div
            onPointerDown={(e) => handleResize(e, "nw")}
            style={{ ...handleStyle, top: -5, left: -5, cursor: "nwse-resize" }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "n")}
            style={{
              ...handleStyle,
              top: -5,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "ns-resize",
            }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "ne")}
            style={{
              ...handleStyle,
              top: -5,
              right: -5,
              cursor: "nesw-resize",
            }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "w")}
            style={{
              ...handleStyle,
              top: "50%",
              left: -5,
              transform: "translateY(-50%)",
              cursor: "ew-resize",
            }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "e")}
            style={{
              ...handleStyle,
              top: "50%",
              right: -5,
              transform: "translateY(-50%)",
              cursor: "ew-resize",
            }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "sw")}
            style={{
              ...handleStyle,
              bottom: -5,
              left: -5,
              cursor: "nesw-resize",
            }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "s")}
            style={{
              ...handleStyle,
              bottom: -5,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "ns-resize",
            }}
          />
          <div
            onPointerDown={(e) => handleResize(e, "se")}
            style={{
              ...handleStyle,
              bottom: -5,
              right: -5,
              cursor: "nwse-resize",
            }}
          />
        </>
      )}
    </div>
  );
}
