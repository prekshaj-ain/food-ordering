import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { useEffect, useState } from "react";
import { RESTAURANT_DETAILS } from "../Constants/endPoints";
import RestaurantDetails from "../Components/RestaurantDetails";
import Skeleton from "../Components/Skeleton";

const SingleRestaurant = function () {
  let { id } = useParams();
  let [details, setDetails] = useState();
  let [menu, setMenu] = useState();
  useEffect(() => {
    fetchRestaurant();
    async function fetchRestaurant() {
      let response = await fetch(RESTAURANT_DETAILS(id));
      let data = await response.json();
      setDetails(data.data.cards);
      console.log(data.data.cards);
    }
  }, [id]);

  if (!details) return <Skeleton type="Single" />;
  return (
    <Layout>
      <RestaurantDetails
        info={details[0]}
        offers={details[1]}
        menu={details[2].groupedCard}
      />
    </Layout>
  );
};

export default SingleRestaurant;
