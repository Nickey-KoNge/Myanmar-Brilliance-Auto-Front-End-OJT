import React, { forwardRef } from "react";
import styles from "./Custom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type BaseProps = {
  leftIcon?: IconProp;
  rightIcon?: IconProp;
  variant?: "action" | "success" | "cancel";
  loading?: boolean;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      variant = "action",
      loading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          ${styles.btn}
          ${styles[`${variant}Btn`]}
          ${isDisabled ? styles.disabled : ""}
        `}
        {...props}
      >
        {leftIcon && !loading && (
          <span className={styles.iconLeft}>
            <FontAwesomeIcon icon={leftIcon} />
          </span>
        )}

        <span className={styles.label}>
          {loading ? "Loading..." : children}
        </span>

        {rightIcon && !loading && (
          <span className={styles.iconRight}>
            <FontAwesomeIcon icon={rightIcon} />
          </span>
        )}
      </button>
    );
  },
);

CustomBtn.displayName = "CustomBtn";

export default CustomBtn;
