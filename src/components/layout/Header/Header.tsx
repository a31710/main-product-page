"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";

import styles from "./Header.module.css";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = "Tom Cook";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.rightSection}>
        <div ref={dropdownRef} className={styles.userMenu}>
          <button
            className={styles.userButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            data-open={isDropdownOpen}
          >
            <div className={styles.avatar}>{userInitials}</div>
            <span className={styles.userName}>{userName}</span>
            <ChevronDown className={styles.chevronIcon} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logout}`}>
                <LogOut className={styles.dropdownIcon} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
