"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.copyright} suppressHydrationWarning>
          © {new Date().getFullYear()} E-commerce Store
        </span>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href={ROUTES.PRODUCTS} className={styles.link}>
            Products
          </Link>
          <Link href={ROUTES.CART} className={styles.link}>
            Cart
          </Link>
          <Link href={ROUTES.FAVORITES} className={styles.link}>
            Favorites
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


