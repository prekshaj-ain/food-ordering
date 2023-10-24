import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import styles from "./RestaurantHeader.module.css";

const RestaurantHeader = function ({ info }) {
  let {
    areaName,
    cuisines,
    name,
    avgRatingString: avgRating,
    totalRatingsString,
    costForTwoMessage: cost,
  } = info;
  let feeMessage = info.feeDetails?.message;
  let time = info?.sla?.slaString;
  return (
    <div>
      <div className={styles.infoContainer}>
        <div>
          <h6>{name}</h6>
          <p>{cuisines.join(", ")}</p>
          <p>{areaName}</p>
        </div>
        <div>
          <button className={styles.rating}>
            <span>
              <StarIcon color="success" className={styles.starIcon} />
              <span>{avgRating}</span>
            </span>
            <span>{totalRatingsString}</span>
          </button>
        </div>
      </div>
      {feeMessage && (
        <div className={styles.feeMessage}>
          <span>
            <InfoIcon fontSize="10px" style={{ color: "orange" }} />
          </span>
          <p>{feeMessage}</p>
        </div>
      )}
      <hr className={styles.dashedLine}></hr>
      <div className={styles.timeCost}>
        {time && (
          <div>
            <span>
              <AccessTimeFilledIcon fontSize="10px" />
            </span>
            <h6>{time}</h6>
          </div>
        )}
        <h6>{cost}</h6>
      </div>
    </div>
  );
};

export default RestaurantHeader;
