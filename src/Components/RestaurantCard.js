import StarsIcon from "@mui/icons-material/Stars";
import { Link } from "react-router-dom";

import { IMAGE_API } from "../Constants/endPoints";
import styles from "./RestaurantCard.module.css";

const RestaurantCard = function ({ details, horizontal }) {
  let offer =
    details.aggregatedDiscountInfoV3 &&
    Object.values(details.aggregatedDiscountInfoV3).slice(0, 2);
  let {
    id,
    areaName,
    avgRatingString: rate,
    cuisines,
    cloudinaryImageId: imgId,
    name,
    sla,
  } = details;
  let image = IMAGE_API(imgId);
  return (
    <Link
      to={`/restaurants/${id}`}
      className={horizontal ? styles.horizontal : styles.card}
    >
      <div className={styles.image}>
        <img src={image} alt={name} />
        {offer && (
          <h6>
            <span>{offer[0]} </span>
            <span>{offer[1]}</span>
          </h6>
        )}
      </div>
      <div className={styles.info}>
        <h5>{name}</h5>
        <div className={styles.rate}>
          <StarsIcon color="success" fontSize="5px" />
          <h6>
            {rate} · {sla.slaString}
          </h6>
        </div>
        <p>{cuisines.join(", ")}</p>
        <p>{areaName}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
