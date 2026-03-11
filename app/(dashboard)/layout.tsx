import React from "react";
import styles from "./layout.module.css";
import { SideNav } from "../components/layout/SideNav/SideNav";
import { TopNav } from "../components/layout/TopNav/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <SideNav />
      <main className={styles.mainContent}>
        <TopNav />
        <div className={styles.pageContent}>{children}</div>
      </main>
    </div>
  );
}
