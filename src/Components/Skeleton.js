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
};

export default Skeleton;
