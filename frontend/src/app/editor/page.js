"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Canvas from "@/components/editor/Canvas";
import RightPanel from "@/components/editor/RightPanel";
import styles from "./page.module.css";

const generateId = () => Math.random().toString(36).substr(2, 9);
const SECTION_TYPES = ["Navbar", "Hero", "About", "Footer"];

export default function Page() {
  // Hydration fix state
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState("desktop");
  const [activeTool, setActiveTool] = useState("Hero");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [sidebarW, setSidebarW] = useState(130);
  const [rightPanelW, setRightPanelW] = useState(260);
  const [mobileCanvasW, setMobileCanvasW] = useState(375);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasBg, setCanvasBg] = useState("#ffffff");
  const [droppedItems, setDroppedItems] = useState([]);

  const isResizingSidebar = useRef(false);
  const isResizingRightPanel = useRef(false);
  const isResizingCanvas = useRef(false);
  const dragStart = useRef({ x: 0, w: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // Mount effect to fix the red error
  useEffect(() => {
    setMounted(true);
  }, []);

  const startSideResize = () => {
    isResizingSidebar.current = true;
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
  };
  const startRightResize = () => {
    isResizingRightPanel.current = true;
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
  };
  const startCanvasResize = (e) => {
    e.preventDefault();
    isResizingCanvas.current = true;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, w: mobileCanvasW };
    document.body.style.cursor = "ew-resize";
  };

  const stopResizing = useCallback(() => {
    isResizingSidebar.current = false;
    isResizingRightPanel.current = false;
    isResizingCanvas.current = false;
    setIsDragging(false);
    document.body.style.cursor = "default";
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isResizingSidebar.current)
        setSidebarW(Math.max(130, Math.min(340, e.clientX)));
      if (isResizingRightPanel.current)
        setRightPanelW(
          Math.max(200, Math.min(500, window.innerWidth - e.clientX)),
        );
      if (isResizingCanvas.current && viewMode === "mobile") {
        const delta = e.clientX - dragStart.current.x;
        setMobileCanvasW(
          Math.max(320, Math.min(800, dragStart.current.w + delta * 2)),
        );
      }
    },
    [viewMode],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;
    if (!over || over.id !== "canvas-board") return;

    const existingItem = droppedItems.find((i) => i.id === active.id);

    if (existingItem) {
      if (SECTION_TYPES.includes(existingItem.type)) return;
      const canvasRect = over.rect;
      const deltaXPercent = (delta.x / canvasRect.width) * 100;
      const deltaYPercent = (delta.y / canvasRect.height) * 100;
      const activeStyles =
        viewMode === "mobile"
          ? { ...existingItem.styles, ...existingItem.mobileStyles }
          : existingItem.styles;
      const currentLeft = parseFloat(activeStyles.left) || 0;
      const currentTop = parseFloat(activeStyles.top) || 0;

      updateItem(
        existingItem.id,
        "left",
        `${(currentLeft + deltaXPercent).toFixed(2)}%`,
        "styles",
      );
      updateItem(
        existingItem.id,
        "top",
        `${(currentTop + deltaYPercent).toFixed(2)}%`,
        "styles",
      );
      return;
    }

    const isSection = SECTION_TYPES.includes(active.id);
    const canvasRect = over.rect;
    const itemRect = active.rect.current.translated;
    const exactX = itemRect?.left - canvasRect?.left || 20;
    const exactY = itemRect?.top - canvasRect?.top || 20;

    const leftPercent = ((exactX / canvasRect.width) * 100).toFixed(2);
    const topPercent = ((exactY / canvasRect.height) * 100).toFixed(2);

    let defaultWidth = isSection ? "100%" : "30%";
    let customProps = {};

    if (active.id === "Navbar") {
      customProps = {
        variant: "style1",
        bgColor: "#111111",
        textColor: "#ffffff",
        logo: "MyBrand",
        links: [
          { label: "Home", targetId: "hero" },
          { label: "About", targetId: "about" },
        ],
        btnText: "Sign Up",
        btnBg: "#ff5c00",
        btnColor: "#ffffff",
      };
    } else if (active.id === "Hero") {
      customProps = {
        variant: "style1",
        bgColor: "#ff5c00",
        title: "Welcome to My Site",
        subtitle: "Build something amazing.",
        btnText: "Get Started",
        btnBg: "#000000",
        btnColor: "#ffffff",
        image: "",
      };
    } else if (active.id === "About") {
      customProps = {
        variant: "style1",
        bgColor: "#ffffff",
        textColor: "#333333",
        title: "About Me",
        description:
          "I am a passionate developer building amazing web experiences.",
        image: "",
      };
    } else if (active.id === "Footer") {
      customProps = {
        variant: "style1",
        bgColor: "#050505",
        textColor: "#888888",
        text: "© 2026 MyBrand. All rights reserved.",
        links: [
          { label: "Twitter", url: "#" },
          { label: "GitHub", url: "#" },
        ],
      };
    }

    const newItem = {
      // Hydration mismatch prevention: only assign random ID if mounted
      id: mounted ? generateId() : "temp-id",
      type: active.id,
      content: "",
      customProps,
      styles: {
        position: isSection ? "relative" : "absolute",
        left: isSection ? "0%" : `${Math.max(0, leftPercent)}%`,
        top: isSection ? "0%" : `${Math.max(0, topPercent)}%`,
        width: defaultWidth,
        height: "auto",
        borderRadius: "0px",
        fontSize: "16px",
        color: "#000000",
        zIndex: isSection ? 1 : 10,
      },
      mobileStyles: {
        left: isSection ? "0%" : "5%",
        top: isSection ? "0%" : `${Math.max(0, topPercent)}%`,
        width: isSection ? "100%" : "90%",
        position: isSection ? "relative" : "absolute",
      },
    };

    setDroppedItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
    setActiveTool(active.id);
  };

  const updateItem = (id, field, value, category = null) => {
    setDroppedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (category === "styles") {
            const target = viewMode === "mobile" ? "mobileStyles" : "styles";
            return { ...item, [target]: { ...item[target], [field]: value } };
          }
          if (category === "customProps")
            return {
              ...item,
              customProps: { ...item.customProps, [field]: value },
            };
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  const deleteItem = (id) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItemId(null);
  };

  const selectedItem = droppedItems.find((i) => i.id === selectedItemId);

  // Don't render complex drag and drop until client is fully hydrated
  if (!mounted) return null;

  return (
    <div className={styles.appContainer}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
        <div className={styles.mainContent}>
          <Sidebar
            sidebarW={sidebarW}
            startSideResize={startSideResize}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
          <Canvas
            viewMode={viewMode}
            isDragging={isDragging}
            mobileCanvasW={mobileCanvasW}
            startCanvasResize={startCanvasResize}
            canvasBg={canvasBg}
            droppedItems={droppedItems}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            setActiveTool={setActiveTool}
            updateItem={updateItem}
          />

          <RightPanel
            width={rightPanelW}
            startResize={startRightResize}
            activeTool={activeTool}
            canvasBg={canvasBg}
            setCanvasBg={setCanvasBg}
            selectedItem={selectedItem}
            updateItem={updateItem}
            viewMode={viewMode}
            deleteItem={deleteItem}
          />
        </div>
      </DndContext>
    </div>
  );
}
