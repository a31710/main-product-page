"use client";

import styles from "./Header.module.css";

import UserButton from "@/components/auth/UserButton";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.rightSection}>
        <UserButton />
      </div>
    </header>
  );
}
