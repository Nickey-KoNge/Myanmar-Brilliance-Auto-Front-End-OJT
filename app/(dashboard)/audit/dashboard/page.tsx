// app/audit/dashboard/page.tsx
import React from "react";
import { UserActivityChart } from "@/app/components/activitychart/UserActivityChart";
import { ActionTypePieChart } from "@/app/components/activitychart/ActionTypePieChart";
import { ModuleActivityChart } from "@/app/components/activitychart/ModuleActivityChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import {
  faGauge,
  faShieldHalved,
  faUsers,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

export default function AuditDashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Title */}
      <h1 className={styles.pageTitle}>
        <FontAwesomeIcon icon={faGauge} className={styles.titleIcon} />
        System Audit Dashboard
      </h1>

      <div className={styles.summaryGrid}>
        
        <div className={`${styles.summaryCard} ${styles.cardLogs}`}>
          <div>
            <p className={styles.cardLabel}>Total Logs Recorded</p>
            <p className={styles.cardValue}>1,248</p>
          </div>
          <FontAwesomeIcon icon={faShieldHalved} className={styles.cardIcon} />
        </div>

        <div className={`${styles.summaryCard} ${styles.cardUsers}`}>
          <div>
            <p className={styles.cardLabel}>Active Users</p>
            <p className={styles.cardValue}>12</p>
          </div>
          <FontAwesomeIcon icon={faUsers} className={styles.cardIcon} />
        </div>

        <div className={`${styles.summaryCard} ${styles.cardModule}`}>
          <div>
            <p className={styles.cardLabel}>Most Active Module</p>
            <p className={styles.cardValue}>Customers</p>
          </div>
          <FontAwesomeIcon icon={faFileLines} className={styles.cardIcon} />
        </div>
      </div>

      <div className={styles.chartsGridRow}>
        <UserActivityChart />
        <ActionTypePieChart />
      </div>

      <div className={styles.bottomChartRow}>
        <ModuleActivityChart />
      </div>
    </div>
  );
}
