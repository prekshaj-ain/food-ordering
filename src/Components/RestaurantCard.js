import StarsIcon from "@mui/icons-material/Stars";
import { IMAGE_API } from "../Constants/endPoints";
import styles from "./RestaurantCard.module.css";

const RestaurantCard = function ({ details }) {
  let offer =
    details.aggregatedDiscountInfoV3 &&
    Object.values(details.aggregatedDiscountInfoV3).slice(0, 2);
  let {
    areaName,
    avgRatingString: rate,
    cuisines,
    cloudinaryImageId: imgId,
    name,
  } = details;
  let image = IMAGE_API(imgId);
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={name} />
        {offer && (
          <h6>
            <span>{offer[0]}</span> <span>{offer[1]}</span>
          </h6>
        )}
      </div>
      <div className={styles.info}>
        <h5>{name}</h5>
        <div className={styles.rate}>
          <StarsIcon color="success" fontSize="5px" />
          <h5>{rate}</h5>
        </div>
        <p>{cuisines.join(", ")}</p>
        <p>{areaName}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
