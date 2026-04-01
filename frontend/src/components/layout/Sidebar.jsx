import React from "react";
import styles from "./Sidebar.module.css";
import ToolCard from "../ui/ToolCard";
import { IconNavbar, IconHero, IconAbout, IconFooter } from "../ui/Icons";

export default function Sidebar({
  sidebarW,
  startSideResize,
  activeTool,
  setActiveTool,
}) {
  const sections = [
    { id: "Navbar", label: "Navbar", icon: <IconNavbar /> },
    { id: "Hero", label: "Hero", icon: <IconHero /> },
    { id: "About", label: "About", icon: <IconAbout /> },
    { id: "Footer", label: "Footer", icon: <IconFooter /> },
  ];

  return (
    <aside className={styles.sidebar} style={{ width: sidebarW }}>
      <div className={styles.resizerR} onMouseDown={startSideResize}></div>

      <div className={styles.category}>
        <div className={styles.catTitle}>SECTIONS</div>
        <div className={styles.grid}>
          {sections.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              label={tool.label}
              icon={tool.icon}
              isActive={activeTool === tool.id}
              onClick={() => setActiveTool(tool.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
