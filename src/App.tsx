import "./App.css";
import CountDown from "./Components/CountDown/CountDown";
import Planet from "./Components/Planet/Planet";
import Stars from "./Components/Stars/Stars";

function App() {
  const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return (
    <>
      <Stars />
      <Planet />
      <CountDown date={targetDate} />
    </>
  );
}

export default App;
