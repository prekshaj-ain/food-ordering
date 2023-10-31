import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useDispatch } from "react-redux";

import styles from "./RestaurantHeader.module.css";
import { setCurrentRestaurant } from "../Store/Slices/appSlice";
import { useEffect } from "react";

const RestaurantHeader = function ({ info }) {
  let {
    id,
    cloudinaryImageId: imgId,
    areaName,
    cuisines,
    name,
    avgRatingString: avgRating,
    totalRatingsString,
    costForTwoMessage: cost,
  } = info;
  let { message: feeMessage = "", totalFee: delivery = 0 } = info.feeDetails;
  let time = info?.sla?.slaString;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setCurrentRestaurant({
        id,
        name,
        areaName,
        imgId,
        deliveryCharge: delivery / 100,
      })
    );
    return () => {
      dispatch(setCurrentRestaurant(null));
    };
  }, []);
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
