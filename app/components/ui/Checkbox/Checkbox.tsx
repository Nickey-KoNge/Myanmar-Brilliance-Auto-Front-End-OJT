import React, { forwardRef } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className={styles.checkboxWrapper}>
        <input type="checkbox" className={styles.checkbox} ref={ref} {...props} />
        {label}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";