// src/components/UserActivityChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { apiClient } from "@/app/features/lib/api-client";
import { ResponsiveContainer } from "recharts";
import styles from "./UserActivityChart.module.css";
interface RawActivityData {
  staffName?: string;
  actionCount?: string | number;
}
interface ChartData {
  staffName: string;
  actionCount: number;
}

type ApiResponse =
  | RawActivityData[]
  | { data?: RawActivityData[] | { data?: RawActivityData[] } };

export function UserActivityChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    apiClient
      .get("/master-audit/analytics/user-activity")

      .then((res: unknown) => {
        const response = res as ApiResponse;
        let rawData: RawActivityData[] = [];

        if (Array.isArray(response)) {
          rawData = response;
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response
        ) {
          const resData = response.data;
          if (Array.isArray(resData)) {
            rawData = resData;
          } else if (
            resData &&
            typeof resData === "object" &&
            "data" in resData &&
            Array.isArray(resData.data)
          ) {
            rawData = resData.data as RawActivityData[];
          }
        }

        console.log("👉 Backend မှလာသော Data အစစ်:", rawData);

        const formattedData: ChartData[] = rawData.map(
          (item: RawActivityData) => ({
            staffName: item.staffName || "Unknown",
            actionCount: Number(item.actionCount) || 0,
          }),
        );

        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  }, []);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Top Active Users</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-color)"
            />
            <XAxis dataKey="staffName" tick={{ fill: "var(--text-main)" }} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--text-main)" }} />
            <Tooltip
              cursor={{ fill: "var(--bg-row-hover)" }}
              contentStyle={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
            <Bar
              dataKey="actionCount"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
