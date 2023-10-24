import SpaIcon from "@mui/icons-material/Spa";

import styles from "./Restaurantmenu.module.css";
import MenuCategory from "./MenuCategory";

const RestaurantMenu = function ({ menu }) {
  const isVeg = menu.cards[0].card.card?.isPureVeg;
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
        <div></div>
      )}
      <hr />
      {menu.cards.map((category, index) => {
        if (index == 0) return;
        return <MenuCategory category={category.card.card} />;
      })}
    </div>
  );
};

export default RestaurantMenu;
