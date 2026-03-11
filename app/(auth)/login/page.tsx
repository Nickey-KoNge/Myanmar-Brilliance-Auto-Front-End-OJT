import React from "react";
import { LoginForm } from "@/app/features/auth/components/LoginForm";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.togglediv}>
        <button className={styles.themeToggle} aria-label="Toggle Theme">
          <FontAwesomeIcon icon={faSun} className={styles.toggleIcon} />
        </button>
      </div>

      <LoginForm />
    </main>
  );
}
