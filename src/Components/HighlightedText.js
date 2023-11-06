const HighlightedText = function ({ text }) {
  const highlightedText = text.split(/{{(.*?)}}/g).map((part, index) => {
    if (index % 2 === 0) {
      return part; // Unmatched text
    } else {
      return (
        <span key={index} style={{ color: "black" }}>
          {part}
        </span>
      ); // Matched text
    }
  });
  return (
    <div style={{ color: "#777", fontSize: ".75rem" }}>{highlightedText}</div>
  );
};

export default HighlightedText;
