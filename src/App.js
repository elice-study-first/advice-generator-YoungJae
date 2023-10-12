import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState("");
  const [rolling, setRolling] = useState(false);

  const getData = async () => {
    const res = await fetch("https://api.adviceslip.com/advice").then((res) =>
      res.json()
    );
    const randomData = res.slip.advice;

    setState(randomData);
  };

  useEffect(() => {
    if (rolling) {
      const interval = setInterval(() => {
        getData();
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [rolling]);

  const rollingRun = () => {
    setRolling(true);
  };

  const rollingStop = () => {
    setRolling(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>A D V I C E # 1 1 7</div>
        <div className="Random_Advice">{state}</div>
        <div className="Under_Bar"></div>
        <button className="Stop_Btn" onClick={rollingStop}>
          <i className="fa-solid fa-pause"></i>
        </button>
        <button className="Run_Btn" onClick={rollingRun}>
          <i className="fa-solid fa-dice-five"></i>
        </button>
      </header>
    </div>
  );
}

export default App;
