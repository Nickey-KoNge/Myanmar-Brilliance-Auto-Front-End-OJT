import React from "react";
import styles from "./page.module.css";
import { SummaryCard } from "../../features/dashboard/components/SummaryCard";
import { AlertsTable } from "../../features/dashboard/components/AlertsTable";
import { faCar, faChartLine, faTags } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  return (
    <>
      {/* Top Action Bar */}
      <div className={styles.dashboardHeader}>
        <div></div> {/* Empty div to push button to right */}
        <button className={styles.liveBtn}>ANALYTICAL LIVE</button>
      </div>

      {/* Row 1: Summary Cards */}
      <div className={styles.topRow}>
        <SummaryCard
          title="TOTAL RENTAL UNITS"
          value="125 Vehicles"
          subtitle="86% Utilization Rate"
          status="success"
          icon={faCar}
        />
        <SummaryCard
          title="RENTAL REVENUE"
          value="$ 429,333"
          subtitle="High Demand"
          status="danger"
          icon={faChartLine}
        />
        <SummaryCard
          title="SALES REVENUE"
          value="$ 158,483"
          subtitle="3 UNITS SOLD"
          status="neutral"
          icon={faTags}
        />
      </div>

      {/* Row 2: Charts (Placeholders for Recharts) */}
      <div className={styles.middleRow}>
        <div className={styles.chartPlaceholder}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            CASHFLOW: RENTAL VS SALE
          </div>
          {/* Recharts component ကို ဒီနေရာမှာ အစားထိုးပါ */}
        </div>
        <div className={styles.chartPlaceholder}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            CASHFLOW: RENTAL PER MONTH
          </div>
          {/* Recharts component ကို ဒီနေရာမှာ အစားထိုးပါ */}
        </div>
      </div>

      {/* Row 3: Distribution & Alerts */}
      <div className={styles.middleRow}>
        <div className={styles.chartPlaceholder}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
            RENTAL VEHICLE DISTRIBUTION
          </div>
        </div>
        <AlertsTable />
      </div>
    </>
  );
}
