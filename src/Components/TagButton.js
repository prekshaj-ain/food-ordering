const TagButton = function (props) {
  const buttonStyle = {
    border: ".5px solid #9999993d",
    borderRadius: "30px",
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    width: "fit-content",
    cursor: "pointer",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };
  const active = {
    borderColor: "black",
    backgroundColor: "rgba(99, 99, 99, 0.1)",
    boxShadow: "none",
  };
  return (
    <div
      onClick={props.onClick}
      style={props.active ? { ...buttonStyle, ...active } : buttonStyle}
    >
      {props.children}
    </div>
  );
};

export default TagButton;
