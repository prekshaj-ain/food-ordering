const TagButton = function (props) {
  return (
    <div
      onClick={props.onClick}
      style={{
        border: ".5px solid #9999993d",
        borderRadius: "30px",
        padding: "5px 10px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        width: "fit-content",
        cursor: "pointer",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      {props.children}
    </div>
  );
};

export default TagButton;
