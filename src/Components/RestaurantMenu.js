import SpaIcon from "@mui/icons-material/Spa";

import styles from "./RestaurantMenu.module.css";
import MenuCategory from "./MenuCategory";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

const RestaurantMenu = function ({ menu }) {
  const isVeg = menu.cards[0].card.card?.isPureVeg;
  const [vegOnly, setVegOnly] = useState(false);
  return (
    <div>
      {isVeg ? (
        <div className={styles.veg}>
          <span>
            <SpaIcon color="success" fontSize="10px" />
          </span>
          <p>Pure veg</p>
        </div>
      ) : (
        <div className={styles.vegToggle}>
          <h6>Veg Only</h6>
          <div>
            <ToggleButton setVegOnly={setVegOnly} />
          </div>
        </div>
      )}
      <hr />
      {menu.cards.map((category, index) => {
        if (index == 0) return;
        return (
          <MenuCategory
            key={index}
            category={category.card.card}
            veg={vegOnly}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
