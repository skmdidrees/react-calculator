
function Keypad({ onButtonClick }) {
  const buttons = [
    "AC", "±", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "−",
    "1", "2", "3", "+",
    "0", ".", "⌫", "="
  ];

  return (
    <div className="calculator-keypad">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => onButtonClick(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default Keypad;
