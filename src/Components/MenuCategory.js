import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import styles from "./MenuCategory.module.css";
import MenuItem from "./MenuItem";

const MenuCategory = function ({ category, subCat }) {
  console.log(category);
  const { title, itemCards: items, categories } = category;
  const [show, setShow] = useState(true);
  const handleClick = function () {
    setShow((prev) => !prev);
  };
  if (categories) {
    return (
      <div>
        <div className={styles.category}>
          <button className={styles.toggleShow} onClick={handleClick}>
            <h6>{`${title}  (${categories?.length})`}</h6>
            <span className={!show ? styles.icon : ""}>
              <KeyboardArrowUpIcon fontSize="small" />
            </span>
          </button>
          {show &&
            categories?.map((cat, index) => {
              return <MenuCategory key={index} category={cat} subCat />;
            })}
        </div>
      </div>
    );
  }
  return (
    <div>
      {items && (
        <div className={subCat ? "" : styles.category}>
          <button className={styles.toggleShow} onClick={handleClick}>
            <h6>{`${title}  (${items?.length})`}</h6>
            <span className={!show ? styles.icon : ""}>
              <KeyboardArrowUpIcon fontSize="small" />
            </span>
          </button>
          {show &&
            items?.map((item, index) => {
              return <MenuItem key={index} item={item} />;
            })}
        </div>
      )}
    </div>
  );
};
export default MenuCategory;
