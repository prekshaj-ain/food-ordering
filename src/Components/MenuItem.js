import StarIcon from "@mui/icons-material/Star";

import VEG from "../Constants/Assets/veg.png";
import NONVEG from "../Constants/Assets/nonveg.png";
import { IMAGE_API } from "../Constants/endPoints";
import styles from "./MenuItem.module.css";

const MenuItem = function ({ item }) {
  let { info } = item?.card;
  let { isVeg, isBestseller, price, name, description, imageId } = info;
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.details}>
          <div className={styles.tag}>
            <span>{isVeg ? <img src={VEG} /> : <img src={NONVEG} />}</span>
            {isBestseller && (
              <span className={styles.bestseller}>
                <span>
                  <StarIcon fontSize="10px" />
                </span>
                <span>Bestseller</span>
              </span>
            )}
          </div>
          <div>{name}</div>
          <p>₹ {price / 100}</p>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.image}>
          <img src={IMAGE_API(imageId)} alt={name} />
          <button className={styles.add}>ADD</button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MenuItem;
