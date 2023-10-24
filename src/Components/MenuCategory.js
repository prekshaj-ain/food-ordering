import styles from "./MenuCategory.module.css";
import MenuItem from "./MenuItem";

const MenuCategory = function ({ category }) {
  // console.log(category);
  console.log(category);
  const { title, itemCards: items } = category;
  return (
    <div>
      {items && (
        <div className={styles.category}>
          <h6>{`${title}  (${items?.length})`}</h6>
          {items?.map((item, index) => {
            return <MenuItem key={index} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};
export default MenuCategory;
