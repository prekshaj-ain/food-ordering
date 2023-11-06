import { useDispatch, useSelector } from "react-redux";

import Skeleton from "./Skeleton";
import styles from "./Suggestions.module.css";
import HighlightedText from "./HighlightedText";
import { addRelatedInfo } from "../Store/Slices/searchSlice";
import { fetchSearchResults } from "../Store/apiCalls";

const Suggestions = function ({ query }) {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.suggestions.loading);
  const suggestions = useSelector((store) => store.suggestions.cache[query]);
  console.log(suggestions);
  const handleClick = function (metadata, type, query) {
    const info = {
      metadata,
      type,
      submitAction: "SUGGESTION",
      str: query,
    };
    dispatch(addRelatedInfo(info));
    fetchSearchResults(dispatch, info);
  };
  if (loading || !suggestions) {
    return <Skeleton type="Suggestions" />;
  }
  return (
    <div className={styles.container}>
      {suggestions?.map((ele, index) => {
        const {
          highlightedText: text,
          tagToDisplay: category,
          cloudinaryId: imgId,
        } = ele;
        const metadata = ele.cta.link.split("&")[1];
        return (
          <button
            key={index}
            className={styles.item}
            onClick={() => handleClick(metadata, category, ele.text)}
          >
            <div className={styles.image}>
              <img
                src={
                  `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/` +
                  imgId
                }
                alt=""
              />
            </div>
            <div>
              <HighlightedText text={text} />
              <p style={{ textAlign: "left" }}>{category}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Suggestions;
