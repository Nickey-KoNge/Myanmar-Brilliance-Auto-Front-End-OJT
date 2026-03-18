"use client";

import React, { useState } from "react";
import styles from "./CreateCompany.module.css";
import { PageHeader } from "../../../components/ui/PageHeader/pageheader";
import { Button } from "../../../components/ui/Button/Button";
import { Input } from "../../../components/ui/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function CreateCompany() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    regNo: "",
  });

  const [logo, setLogo] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log("FORM DATA:", form);

    // 👉 later connect API
    router.push("/company");
  };

  return (
    <div className={styles.container}>
      <PageHeader
        titleData={{
          icon: <FontAwesomeIcon icon={faBuilding} />,
          text: "Company Registration",
        }}
        actionNode={
          <div className={styles.actions}>
            <Button onClick={() => router.push("/company")}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Record</Button>
          </div>
        }
      />

      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>PROFESSIONAL ASSIGNMENT</div>

          <Input
            label="Website"
            value={form.website}
            onChange={(e: any) => handleChange("website", e.target.value)}
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(e: any) => handleChange("email", e.target.value)}
          />
        </div>

        {/* RIGHT */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>CORE IDENTITY</div>

          <Input
            label="Company Name"
            value={form.name}
            onChange={(e: any) => handleChange("name", e.target.value)}
          />

          <Input
            label="Registration No"
            value={form.regNo}
            onChange={(e: any) => handleChange("regNo", e.target.value)}
          />
        </div>

        {/* IMAGE */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>SECURITY & PHOTO</div>

          <div className={styles.uploadBox}>
            {logo ? (
              <img src={logo} className={styles.preview} />
            ) : (
              "Upload Logo"
            )}
            <input type="file" onChange={handleImage} />
          </div>
        </div>

        {/* CONTACT */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>CONTACT & ADDRESS</div>

          <Input
            label="Phone"
            value={form.phone}
            onChange={(e: any) => handleChange("phone", e.target.value)}
          />

          <Input
            label="Country"
            value={form.country}
            onChange={(e: any) => handleChange("country", e.target.value)}
          />

          <Input
            label="City"
            value={form.city}
            onChange={(e: any) => handleChange("city", e.target.value)}
          />

          <textarea
            className={styles.textarea}
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              handleChange("address", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}