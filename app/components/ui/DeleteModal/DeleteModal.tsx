"use client";

import React from "react";
import styles from "./DeleteModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string; // e.g., "Company record", "Staff record"
  isDeleting?: boolean;
};

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "record",
  isDeleting = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button className={styles.closeIcon} onClick={onClose} disabled={isDeleting}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <div className={styles.content}>
          {/* Warning Icon */}
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faTriangleExclamation} className={styles.warningIcon} />
          </div>

          <h2 className={styles.title}>Confirm Delete</h2>
          
          <p className={styles.description}>
            Are you sure you want to delete "<span className={styles.highlight}>{itemName}</span>"? 
            This action will remove the {itemType} permanently from the database.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionArea}>
          <button 
            className={styles.cancelBtn} 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            className={styles.deleteBtn} 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}