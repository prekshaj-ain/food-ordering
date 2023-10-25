import styles from "./ToggleButton.module.css";
const ToggleButton = function ({ setVegOnly }) {
  const handleToggle = (e) => {
    setVegOnly(e.target.checked);
  };
  return (
    <label className={styles.toggle}>
      <input type="checkbox" onChange={handleToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
