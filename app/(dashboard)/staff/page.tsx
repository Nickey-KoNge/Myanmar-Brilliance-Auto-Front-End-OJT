// "use client";

// import styles from "./page.module.css";
// import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAngleLeft,
//   faAngleRight,
//   faCalendarDays,
//   faCaretDown,
//   faClockRotateLeft,
//   faPlus,
//   faTrashCan,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import { Button } from "@/app/components/ui/Button/Button";
// import { PageHeader } from "@/app/components/ui/PageHeader/pageheader";
// import { useEffect, useState } from "react";
// import { apiClient } from "@/app/features/lib/api-client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const TABLE_HEADERS = [
//   "Staff Info",
//   "Email",
//   "Address",
//   "Role",
//   "Branch",
//   "Phone",
//   "Actions",
// ];

// interface Staff {
//   id: string;
//   staffName: string;
//   image: string;
//   email: string;
//   fullAddress: string;
//   position: string;
//   branches_name: string;
//   phone: string;
// }

// interface Branch {
//   id: string;
//   branches_name: string;
// }

// interface Role {
//   id: string;
//   role_name: string;
// }

// export default function StaffPage() {
//   const [staffs, setStaffs] = useState<Staff[]>([]);
//   const router = useRouter();

//   const renderLiveButtonArea = (
//     <div className={styles.headerActionArea}>
//       <Link href="/staff/create" className={styles.headerbarButton}>
//         <FontAwesomeIcon icon={faPlus} />
//         ADD STAFF
//       </Link>
//     </div>
//   );

//   useEffect(() => {
//     const fetchStaffs = async () => {
//       try {
//         const response = await apiClient.get("/master-company/staff");
//         setStaffs(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchStaffs();
//   }, []);

//   // fetch branch
//   const [branches, setBranches] = useState<Branch[]>([]);
//   const [roles, setRoles] = useState<Role[]>([]);
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const branches = await apiClient.get("/master-company/branches");
//         const roles = await apiClient.get("/master-service/roles");
//         setBranches(branches.data);
//         setRoles(roles.data);
//         console.log(roles.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchFilters();
//   }, []);

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const handleDelete = async (id: string, name: string) => {
//     const confirmDelete = confirm(`Delete ${name}?`);
//     if (!confirmDelete) return;

//     setDeletingId(id);

//     try {
//       await apiClient.delete(`/master-company/staff/${id}`);
//       setStaffs((prev) => prev.filter((s) => s.id !== id));
//     } catch (error) {
//       console.error(error);
//       alert("Delete failed");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <>
//       <PageHeader
//         titleData={{
//           icon: <FontAwesomeIcon icon={faUser} />,
//           text: "Staff Management",
//         }}
//         actionNode={renderLiveButtonArea}
//       />
//       <div className={styles.gridContainer}>
//         <section className={styles.gridBox}>
//           <div className={styles.spacer}>
//             <div>
//               <p className={styles.gridBoxTitle}>EMPLOYEE MASTER RECORDS</p>

//               <table className={styles.table}>
//                 <thead>
//                   <tr>
//                     {TABLE_HEADERS.map((h) => (
//                       <th key={h}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {staffs.map((staff) => (
//                     <tr
//                       key={staff.id}
//                       onClick={() => router.push(`/staff/update/${staff.id}`)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <td className={styles.staffInfo}>
//                         <Image
//                           src={staff.image || "/default-user.png"}
//                           alt={staff.staffName}
//                           width={60}
//                           height={60}
//                           unoptimized
//                         />

//                         {staff.staffName}
//                       </td>
//                       <td>{staff.email || "need fix"}</td>
//                       <td>{staff.fullAddress}</td>
//                       <td>{staff.position || "need fix"}</td>
//                       <td>{staff.branches_name}</td>
//                       <td>{staff.phone || "need fix"}</td>
//                       <td onClick={(e) => e.stopPropagation()}>
//                         <button
//                           className={styles.deleteBtn}
//                           disabled={deletingId === staff.id}
//                           onClick={() =>
//                             handleDelete(staff.id, staff.staffName)
//                           }
//                         >
//                           <FontAwesomeIcon icon={faTrashCan} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className={styles.pagination}>
//               <p>
//                 Showing <span className={styles.spanText}>1</span> to{" "}
//                 <span className={styles.spanText}>10</span> of{" "}
//                 <span className={styles.spanText}>200</span> total records
//               </p>
//               <div className={styles.pageActions}>
//                 <span>
//                   Page <span className={styles.spanText}>1</span> of{" "}
//                   <span className={styles.spanText}>20</span>
//                 </span>
//                 <button>
//                   <FontAwesomeIcon icon={faAngleLeft} />
//                 </button>
//                 <button>
//                   <FontAwesomeIcon icon={faAngleRight} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <aside className={styles.gridBox}>
//           <p className={styles.gridBoxTitle}>Employee Search</p>

//           <hr className={styles.cuttingLine} />

//           <div className={styles.searchContainer}>
//             <div className={styles.field}>
//               <label className={styles.label}>Searching</label>
//               <div className={styles.inputWrapper}>
//                 <input
//                   type="text"
//                   placeholder="Search by name, email, address..."
//                 />
//               </div>
//             </div>

//             <div className={styles.filterRow}>
//               {["From", "To"].map((label) => (
//                 <div key={label} className={styles.field}>
//                   <label className={styles.label}>{label}</label>
//                   <div className={styles.inputWrapper}>
//                     <input type="date" className={styles.dateSearch} />
//                     <FontAwesomeIcon
//                       icon={faCalendarDays}
//                       className={styles.icon}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className={styles.filterRow}>
//               {/* Branches */}
//               <div className={styles.field}>
//                 <label htmlFor="branches" className={styles.label}>
//                   Branch
//                 </label>
//                 <div className={styles.inputWrapper}>
//                   <select name="branch" id="branch" defaultValue="all">
//                     <option value="all">All Branches</option>
//                     {branches.map((branch) => (
//                       <option key={branch.id} value={branch.id}>
//                         {branch.branches_name}
//                       </option>
//                     ))}
//                   </select>
//                   <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
//                 </div>
//               </div>

//               {/* Roles */}
//               <div className={styles.field}>
//                 <label htmlFor="branches" className={styles.label}>
//                   Role
//                 </label>
//                 <div className={styles.inputWrapper}>
//                   <select name="role" id="role" defaultValue="all">
//                     <option value="all">All Roles</option>
//                     {roles.map((role) => (
//                       <option key={role.id} value={role.id}>
//                         {role.role_name}
//                       </option>
//                     ))}
//                   </select>
//                   <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
//                 </div>
//               </div>
//             </div>

//             <div className={styles.btnBox}>
//               <Button className={styles.resetBtn}>Reset Filters</Button>
//             </div>

//             <hr className={styles.cuttingLine} />

//             <div className={styles.recentRecord}>
//               <span>
//                 <FontAwesomeIcon icon={faClockRotateLeft} />
//               </span>
//               <p className={styles.recentTitle}>RECENT RECORD</p>

//               <span />
//               <div className={styles.stat}>
//                 <div>
//                   <p className={styles.statLable}>Total Staff :</p>
//                   <p className={styles.textDanger}>40</p>
//                 </div>
//                 <div>
//                   <p className={styles.statLable}>Active Staff :</p>
//                   <p className={styles.textSuccess}>36</p>
//                 </div>
//                 <div>
//                   <p className={styles.statLable}>Inactive Staff :</p>
//                   <p className={styles.textDanger}>4</p>
//                 </div>
//               </div>
//             </div>

//             <hr className={styles.cuttingLine} />

//             <p className={styles.lastEdited}>
//               Last Edited :{" "}
//               <span className={styles.spanText}>Nickey (Admin)</span>
//             </p>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faCaretDown,
  faClockRotateLeft,
  faPlus,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Components
import { Button } from "@/app/components/ui/Button/Button";
import { PageHeader } from "@/app/components/ui/PageHeader/pageheader";
import { DataTable } from "@/app/components/ui/DataTable/DataTable";

// Styles
import styles from "./page.module.css";
// Note: Ensure styles like .staffCell, .staffImg, and .deleteBtn
// are defined in your page.module.css or the DataTable.module.css

import { apiClient } from "@/app/features/lib/api-client";

interface Staff {
  id: string;
  staffName: string;
  image: string;
  email: string;
  fullAddress: string;
  position: string;
  branches_name: string;
  phone: string;
}

interface Branch {
  id: string;
  branches_name: string;
}

interface Role {
  id: string;
  role_name: string;
}

export default function StaffPage() {
  const router = useRouter();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1. Fetch Staff Data
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await apiClient.get("/master-company/staff");
        setStaffs(response.data);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };
    fetchStaffs();
  }, []);

  // 2. Fetch Filters (Branches/Roles)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [branchesRes, rolesRes] = await Promise.all([
          apiClient.get("/master-company/branches"),
          apiClient.get("/master-service/roles"),
        ]);
        setBranches(branchesRes.data);
        setRoles(rolesRes.data);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchFilters();
  }, []);

  // 3. Delete Handler
  const handleDelete = async (id: string, name: string) => {
    const confirmDelete = confirm(`Delete ${name}?`);
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await apiClient.delete(`/master-company/staff/${id}`);
      setStaffs((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // 4. Table Column Definitions
  const columns = [
    {
      header: "Staff Info",
      key: "staffName",
      render: (staff: Staff) => (
        <div className={styles.staffInfo}>
          <Image
            src={staff.image || "/default-user.png"}
            alt={staff.staffName}
            width={40}
            height={40}
            unoptimized
            className={styles.staffImg}
          />
          {staff.staffName}
        </div>
      ),
    },
    { header: "Email", key: "email" },
    { header: "Address", key: "fullAddress" },
    { header: "Role", key: "position" },
    { header: "Branch", key: "branches_name" },
    { header: "Phone", key: "phone" },
    {
      header: "Actions",
      key: "actions",
      render: (staff: Staff) => (
        <button
          className={styles.deleteBtn}
          disabled={deletingId === staff.id}
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click trigger
            handleDelete(staff.id, staff.staffName);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      ),
    },
  ];

  const renderLiveButtonArea = (
    <div className={styles.headerActionArea}>
      <Link href="/staff/create" className={styles.headerbarButton}>
        <FontAwesomeIcon icon={faPlus} />
        ADD STAFF
      </Link>
    </div>
  );

  return (
    <>
      <PageHeader
        titleData={{
          icon: <FontAwesomeIcon icon={faUser} />,
          text: "Staff Management",
        }}
        actionNode={renderLiveButtonArea}
      />

      <div className={styles.gridContainer}>
        {/* Main Content: Table Section */}
        <section className={styles.gridBox}>
          <div className={styles.spacer}>
            <div>
              <p className={styles.gridBoxTitle}>EMPLOYEE MASTER RECORDS</p>

              <DataTable
                columns={columns}
                data={staffs}
                onRowClick={(staff) => router.push(`/staff/update/${staff.id}`)}
                emptyMessage="No staff records found."
              />
            </div>

            {/* Pagination remains separate from the table core logic */}
            <div className={styles.pagination}>
              <p>
                Showing <span className={styles.spanText}>1</span> to{" "}
                <span className={styles.spanText}>10</span> of{" "}
                <span className={styles.spanText}>200</span> total records
              </p>
              <div className={styles.pageActions}>
                <span>
                  Page <span className={styles.spanText}>1</span> of{" "}
                  <span className={styles.spanText}>20</span>
                </span>
                <button>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar: Search & Filters */}
        <aside className={styles.gridBox}>
          <p className={styles.gridBoxTitle}>Employee Search</p>
          <hr className={styles.cuttingLine} />

          <div className={styles.searchContainer}>
            <div className={styles.field}>
              <label className={styles.label}>Searching</label>
              <div className={styles.inputWrapper}>
                <input type="text" placeholder="Search by name, email..." />
              </div>
            </div>

            <div className={styles.filterRow}>
              {["From", "To"].map((label) => (
                <div key={label} className={styles.field}>
                  <label className={styles.label}>{label}</label>
                  <div className={styles.inputWrapper}>
                    <input type="date" className={styles.dateSearch} />
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className={styles.icon}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.filterRow}>
              <div className={styles.field}>
                <label className={styles.label}>Branch</label>
                <div className={styles.inputWrapper}>
                  <select defaultValue="all">
                    <option value="all">All Branches</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.branches_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Role</label>
                <div className={styles.inputWrapper}>
                  <select defaultValue="all">
                    <option value="all">All Roles</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.role_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
                </div>
              </div>
            </div>

            <div className={styles.btnBox}>
              <Button className={styles.resetBtn}>Reset Filters</Button>
            </div>

            <hr className={styles.cuttingLine} />

            <div className={styles.recentRecord}>
              <span>
                {" "}
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </span>
              <p className={styles.recentTitle}>RECENT RECORD</p>
              <span />
              <div className={styles.stat}>
                <div>
                  <p className={styles.statLable}>Total Staff :</p>
                  <p className={styles.textDanger}>40</p>
                </div>
                <div>
                  {" "}
                  <p className={styles.statLable}>Active Staff :</p>
                  <p className={styles.textSuccess}>36</p>{" "}
                </div>{" "}
                <div>
                  <p className={styles.statLable}>Inactive Staff :</p>
                  <p className={styles.textDanger}>4</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>

            <hr className={styles.cuttingLine} />
            <p className={styles.lastEdited}>
              Last Edited :{" "}
              <span className={styles.spanText}>Nickey (Admin)</span>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
