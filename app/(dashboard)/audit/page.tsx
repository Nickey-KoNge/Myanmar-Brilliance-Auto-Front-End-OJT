"use client";

import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faRotateLeft,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { apiClient } from "@/app/features/lib/api-client";
import { PageGridLayout } from "@/app/components/layout/PageGridLayout/PageGridLayout";
import { DataTable } from "@/app/components/ui/DataTable/DataTable";
import { Pagination } from "@/app/components/ui/Pagination/Pagination";
import TextInput from "@/app/components/ui/SearchBoxes/TextInput";
import DateInput from "@/app/components/ui/SearchBoxes/DateInput";
import ActionBtn from "@/app/components/ui/Button/ActionBtn";
import { FilterState, useFilters } from "@/app/hooks/userFilters";

import styles from "./page.module.css";

interface AuditLog {
  id: string;
  created_at: string;
  performed_by: string;
  action: string;
  entity_name: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
}

export default function AuditLogPage() {
  // const router = useRouter();
  const [auditData, setAuditData] = useState<AuditLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const PAGE_SIZE = 6;

  // Active Filters State
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    search: "",
    startDate: "",
    endDate: "",
  });

  // Custom Hook for Filters
  const { filters, updateFilter, resetFilters } = useFilters(
    { search: "", startDate: "", endDate: "" },
    (debouncedFilters: FilterState) => {
      const isFilterChanged =
        activeFilters.search !== debouncedFilters.search ||
        activeFilters.startDate !== debouncedFilters.startDate ||
        activeFilters.endDate !== debouncedFilters.endDate;

      setActiveFilters(debouncedFilters);

      if (isFilterChanged) {
        setCurrentPage(1);
      }
    },
  );

  const fetchAuditData = async () => {
    try {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        limit: PAGE_SIZE.toString(),
      };

      if (activeFilters.search)
        params.entity_name = activeFilters.search as string;
      if (activeFilters.startDate)
        params.startDate = activeFilters.startDate as string;
      if (activeFilters.endDate)
        params.endDate = activeFilters.endDate as string;

      const queryString = new URLSearchParams(params).toString();
      const response = await apiClient.get(`/master-audit?${queryString}`);

      const res = response as unknown as {
        data?:
          | AuditLog[]
          | { data?: AuditLog[]; total?: number; totalPages?: number };
        total?: number;
        totalPages?: number;
      };

      let logList: AuditLog[] = [];
      let total = 0;
      let totalPagesCount = 1;

      if (res && typeof res === "object") {
        if (Array.isArray(res.data)) {
          logList = res.data;
          total = res.total || 0;
          totalPagesCount = res.totalPages || 1;
        } else if (
          res.data &&
          typeof res.data === "object" &&
          Array.isArray(res.data.data)
        ) {
          logList = res.data.data;
          total = res.data.total || 0;
          totalPagesCount = res.data.totalPages || 1;
        }
      }

      setAuditData(logList);
      setTotalRecords(total);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error("Failed to fetch audits:", error);
      setAuditData([]);
    }
  };

  useEffect(() => {
    fetchAuditData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeFilters]);

  // Restore Function
  const handleRestore = async (auditId: string, entityName: string) => {
    if (!window.confirm("Are you sure you want to restore this data?")) return;

    try {
      let url = "";
      if (entityName === "branches") {
        url = `/master-company/branches/restore/${auditId}`;
      } else if (entityName === "company") {
        url = `/master-company/company/restore/${auditId}`;
      } else {
        toast.error("Restore not supported for this module yet.");
        return;
      }

      await apiClient.post(url);
      toast.success("Data restored successfully!");
      fetchAuditData();
    } catch (error) {
      console.error("Restore error:", error);
      toast.error("Failed to restore data.");
    }
  };

  // DataTable Columns Setup
  const columns = [
    {
      header: "User & Date",
      key: "user_info",
      render: (item: AuditLog) => (
        <div className={styles.userInfoCell}>
          <span className={styles.userName}>{item.performed_by}</span>

          <span className={styles.dateText}>
            {new Date(item.created_at).toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (item: AuditLog) => {
        let badgeClass = styles.badgeCreate;
        if (item.action === "UPDATE") badgeClass = styles.badgeUpdate;
        if (item.action === "DELETE") badgeClass = styles.badgeDelete;
        if (item.action === "RESTORE") badgeClass = styles.badgeRestore;

        return (
          <span className={`${styles.badge} ${badgeClass}`}>{item.action}</span>
        );
      },
    },
    {
      header: "Record Type",
      key: "entity_name",
      render: (item: AuditLog) => (
        <strong style={{ textTransform: "capitalize" }}>
          {item.entity_name}
        </strong>
      ),
    },
    {
      header: "Before Change",
      key: "olddata",
      render: (item: AuditLog) => (
        <div className={`${styles.changesCell} ${styles.dataColumn}`}>
          {item.old_values && (
            <div className={styles.oldValue}>
              {Object.entries(item.old_values).map(([key, value]) => (
                <div key={key} className={styles.dataRow}>
                  <span className={styles.dataKey}>
                    <b>{key} : </b>
                  </span>
                  <span className={styles.dataVal}>{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "After Change",
      key: "newdata",
      render: (item: AuditLog) => (
        <div className={`${styles.changesCell} ${styles.dataColumn}`}>
          {item.new_values && (
            <div className={styles.newValue}>
              {Object.entries(item.new_values).map(([key, value]) => (
                <div key={key} className={styles.dataRow}>
                  <span className={styles.dataKey}>
                    <b>{key} : </b>
                  </span>
                  <span className={styles.dataVal}>{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (item: AuditLog) =>
        (item.action === "UPDATE" || item.action === "DELETE") && (
          <button
            className={styles.restoreBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleRestore(item.id, item.entity_name);
            }}
            title="Restore Data"
          >
            <FontAwesomeIcon icon={faRotateLeft} /> Restore
          </button>
        ),
    },
  ];
  return (
    <PageGridLayout
      sidebar={
        <div className={styles.sidebarWrapper}>
          <div className={styles.topSection}>
            <p className={styles.gridBoxTitle}>Audit Log Filters</p>
            <hr className={styles.cuttingLine} />

            <div className={styles.searchContainer}>
              <TextInput
                label="Record Type (e.g. branches)"
                placeholder="Search module..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />

              <div className={styles.filterRow}>
                <DateInput
                  label="From Date"
                  value={filters.startDate}
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                  rightIcon={faCalendarDays}
                />
                <DateInput
                  label="To Date"
                  value={filters.endDate}
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                  rightIcon={faCalendarDays}
                />
              </div>

              <div style={{ alignSelf: "flex-start" }}>
                <ActionBtn
                  type="reset"
                  variant="action"
                  fullWidth={false}
                  onClick={resetFilters}
                >
                  Reset
                </ActionBtn>
              </div>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <hr className={styles.cuttingLine} />
            <div className={styles.recentRecord}>
              <span>
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  style={{ color: "#fff" }}
                />
              </span>
              <p className={styles.recentTitle}>SECURITY STATS</p>
              <span />
              <div className={styles.stat}>
                <div>
                  <p className={styles.statLable}>Total Logs :</p>
                  <p className={styles.textMain}>{totalRecords}</p>
                </div>
              </div>
            </div>
            <hr className={styles.cuttingLine} />
          </div>
        </div>
      }
    >
      <div className={styles.mainContentArea}>
        <div className={styles.tableHeaderArea}>
          <div className={styles.paginationInfoWrapper}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
              showOnlyInfo={true}
            />
          </div>
          <p className={styles.tableTitle}>SYSTEM AUDIT LOGS</p>
        </div>

        <div className={styles.tableContainer}>
          <DataTable
            data={auditData}
            columns={columns}
            emptyMessage="No audit logs found."
          />
        </div>

        <div className={styles.paginationFooter}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
            showOnlyActions={true}
          />
        </div>
      </div>
    </PageGridLayout>
  );
}
