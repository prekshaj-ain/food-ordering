import React from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import styles from "./Header.module.css";

const Header = function () {
  const items = useSelector((store) => store.cart.items);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.left}>
          <Logo />
        </Link>
        <div className={styles["header-items"]}>
          <Link to="/search" className={styles.item}>
              <SearchIcon fontSize="small" />
              <h6>Search</h6>
          </Link>
          <Link to="/checkout" className={styles.item}>
            <Badge
              badgeContent={items.length}
              color="success"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <ShoppingCartIcon fontSize="small" />
            </Badge>
            <h6>Cart</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
