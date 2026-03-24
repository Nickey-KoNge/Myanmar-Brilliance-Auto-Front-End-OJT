//app/(auth)/login/page.tsx;
"use client";
import React from "react";
import { LoginForm } from "@/app/features/auth/components/LoginForm";
import styles from "./page.module.css";

export default function LoginPage() {

  return (
    <main className={styles.pageContainer}>
      <LoginForm />
    </main>
  );
}
