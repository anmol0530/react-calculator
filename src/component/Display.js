import "./Display.css";

// const Display = () => {
//   return <div className="display">Display</div>;
// };

const Display = (props) => {
  const { value, ...propss } = props;

  const language = /*navigator.language || */ "en-IN";
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  });

  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/);

  if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return (
    <div {...propss} className="calculator-display">
      {/* <div className="calculator-display"> */}
      <div className="input">{formattedValue}</div>
    </div>
  );
};

export default Display;
