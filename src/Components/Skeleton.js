import Layout from "./Layout";
import styles from "./Skeleton.module.css";
const Skeleton = function ({ type }) {
  if (type === "Posts") {
    return (
      <div className={styles.container}>
        <div className={styles.cards}>
          {Array.from(Array(10)).map((e, index) => {
            return <div className={styles.card} key={index}></div>;
          })}
        </div>
      </div>
    );
  }
  if (type === "Suggestions") {
    return (
      <div>
        {Array.from(Array(2)).map((e, index) => {
          return <div className={styles.item} key={index}></div>;
        })}
      </div>
    );
  }
  if (type === "Single") {
    return (
      <Layout>
        <div className={styles.details}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.heading}></div>
        {Array.from(Array(10)).map((e, index) => {
          return <div className={styles.item} key={index}></div>;
        })}
      </Layout>
    );
  }
  if (type === "Search") {
    return (
      <div className={styles.box}>
        {Array.from(Array(5)).map((e, index) => {
          return (
            <div key={index} className={styles.content}>
              <div style={{ width: "20px" }}></div>
              <div style={{ width: "50%" }}></div>
              <div style={{ width: "40%" }}></div>
              <div style={{ width: "30%" }}></div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Skeleton;
