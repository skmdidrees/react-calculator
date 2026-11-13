
import { useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import "./App.css";

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldReset, setShouldReset] = useState(false);

  function handleButtonClick(button) {

    // Handle AC (clear everything)
    if (button === "AC") {
      setCurrentValue("0");
      setPreviousValue("");
      setFirstOperand(null);
      setOperator(null);
      setShouldReset(false);
      return;
    }

    // Handle number buttons
    if (!isNaN(button)) {
      if (shouldReset || currentValue === "Error") {
        setCurrentValue(button);
        setShouldReset(false);
      } else {
        setCurrentValue(
          currentValue === "0" ? button : currentValue + button
        );
      }
      return;
    }

    // Handle decimal point
    if (button === ".") {
      if (shouldReset) {
        setCurrentValue("0.");
        setShouldReset(false);
      } else if (!currentValue.includes(".")) {
        setCurrentValue(currentValue + ".");
      }
      return;
    }

    // Handle positive and negative sign
    if (button === "±") {
      if (currentValue !== "0" && currentValue !== "Error") {
        setCurrentValue(
          currentValue.startsWith("-")
            ? currentValue.slice(1)
            : "-" + currentValue
        );
      }
      return;
    }

    // Handle percentage
    if (button === "%") {
      if (currentValue !== "Error") {
        setCurrentValue(String(Number(currentValue) / 100));
      }
      return;
    }

    // Handle backspace
    if (button === "⌫") {
      if (!shouldReset && currentValue !== "Error") {
        setCurrentValue(
          currentValue.length > 1
            ? currentValue.slice(0, -1)
            : "0"
        );
      }
      return;
    }

    // Handle mathematical operators
    if (["+", "−", "×", "÷"].includes(button)) {
      if (currentValue === "Error") return;

      setFirstOperand(currentValue);
      setOperator(button);
      setPreviousValue(`${currentValue} ${button}`);
      setShouldReset(true);
      return;
    }

    // Handle equals
    if (button === "=") {
      if (firstOperand === null || operator === null) return;

      const first = Number(firstOperand);
      const second = Number(currentValue);
      let result;

      switch (operator) {
        case "+":
          result = first + second;
          break;
        case "−":
          result = first - second;
          break;
        case "×":
          result = first * second;
          break;
        case "÷":
          result = second === 0 ? "Error" : first / second;
          break;
        default:
          return;
      }

      if (result !== "Error") {
        result = String(Number(result.toPrecision(12)));
      }

      setPreviousValue(`${firstOperand} ${operator} ${currentValue} =`);
      setCurrentValue(result);
      setFirstOperand(null);
      setOperator(null);
      setShouldReset(true);
    }
  }

  return (
    <div className="calculator">
      <h1>React Calculator</h1>

      <Display
        previousValue={previousValue}
        currentValue={currentValue}
      />

      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
