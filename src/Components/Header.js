import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PercentIcon from "@mui/icons-material/Percent";

import Logo from "./Logo";
import styles from "./Header.module.css";

const Header = function () {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles["header-items"]}>
          <button className={styles.item}>
            <SearchIcon fontSize="small" />
            <h6>Search</h6>
          </button>
          <button className={`${styles.item} ${styles.offers}`}>
            <PercentIcon fontSize="small" />
            <h6>Offers</h6>
          </button>
          <button className={styles.item} tabIndex={0}>
            <ShoppingCartIcon fontSize="small" />
            <h6>Cart</h6>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
