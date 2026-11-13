
function Display({ previousValue, currentValue }) {
  return (
    <div className="calculator-display">
      <div className="previous-value">
        {previousValue}
      </div>

      <div className="current-value">
        {currentValue}
      </div>
    </div>
  );
}

export default Display;
