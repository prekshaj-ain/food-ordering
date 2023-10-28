import LOGO from "../Constants/Assets/food-delivery.png";

const Logo = function () {
  return (
    <div style={{ height: "50px", width: "50px" }}>
      <img
        src={LOGO}
        style={{ objectFit: "cover", height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Logo;
