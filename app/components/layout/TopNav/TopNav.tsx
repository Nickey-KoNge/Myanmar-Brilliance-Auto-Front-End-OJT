import React from "react";
import styles from "./TopNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faBell,
  faUser,
  faChevronDown,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

export const TopNav = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.companyInfo}>
        <div className={styles.logoIcon}>
          <FontAwesomeIcon icon={faCar} style={{ width: "18px" }} />
        </div>
        <div>
          MYANMAR BRILLIANCE <span>AUTO</span>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionBtn}>
          <FontAwesomeIcon icon={faSun} style={{ width: "16px" }} />
        </div>
        <div className={styles.actionBtn}>
          <FontAwesomeIcon icon={faBell} style={{ width: "16px" }} />
          <span className={styles.badge}>1</span>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUser} style={{ width: "16px" }} />
          </div>
          <span className={styles.userName}>STEVEN JOHN</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ width: "10px", color: "#888" }}
          />
        </div>
      </div>
    </header>
  );
};
