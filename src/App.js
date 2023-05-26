import "./App.css";
import { useState, useRef } from "react";
import Timer from "./Components/Timer";
import Header from "./Components/Header";

function App() {
  const KEYS = new Set("asdfkl;");
  const getRandomKey = (set) => {
    const array = Array.from(set);
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const [key, setKey] = useState("");
  const [pressedKey, setPressedKey] = useState("");
  const [numOfKeyPressed, setNumOfKeyPressed] = useState(0);
  const [correctEntry, setCorrectEntry] = useState(0);
  const [inCorrectEntry, setInCorrectEntry] = useState(0);
  const [inputDisable, setInputDisable] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef(null);

  const reset = () => {
    setKey("");
    setNumOfKeyPressed(0);
    setPressedKey("");
    setCorrectEntry(0)
    setInCorrectEntry(0)
    setShowResults(false);
  };

  const calculateAccuracy = () => {
    if(correctEntry === 0) return 0;
    const accuracy = (correctEntry / (inCorrectEntry + correctEntry)) * 100;
    return Math.floor(accuracy);
  };

  const getKey = (KEYS) => {
    setKey(getRandomKey(KEYS));
  };

  const focusInput = () => {
    inputRef.current.focus();
  };


  const handleKeyDown = (event) => {
    setNumOfKeyPressed(numOfKeyPressed + 1);
    const k = event.key;
    setPressedKey(k);
    if (!KEYS.has(k)) {
      setPressedKey("");
    }
    if (k === key) {
      const newRandomKey = getRandomKey(KEYS);
      setKey(newRandomKey);
      setCorrectEntry(correctEntry + 1);
    } else {
      setInCorrectEntry(inCorrectEntry + 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Header />
      <div className="h-[90vh] w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center shadow-lg drop-shadow-lg rounded-md p-4 bg-pink-50 mt-3 w-7/12">
        <p className="text-xl font-bold">
          Start game by clicking on start button below
        </p>
        <div className="text-xl text-bold ">
          <Timer
          getRandomKey={getKey}
          focusInput={focusInput}
          reset={reset}
          calculateAccuracy={calculateAccuracy}
          setInputDisable = {setInputDisable}
          setShowResults = {setShowResults}
        />
        </div>
        
        <div className="flex w-full  justify-center ">
        Next word :
          <div className="flex flex-col w-4/5">
            <div className="ml-2  bg-gray-500 h-12 text-white text-center flex items-center justify-center text-3xl">
            {key}
            </div>
            <div className="ml-2">
          <input
              className="h-12  w-full mt-8 text-center text-xl text-bold border-2 border-gray-400"
              type="text"
              onKeyDown={handleKeyDown}
              value={pressedKey}
              ref={inputRef}
              disabled = {inputDisable}
            />
        </div>
          </div>
          
        </div>

        
        {showResults && <div className="flex gap-x-2 mt-3">
          <div className="flex text-sm flex-col items-center justify-center bg-slate-700 text-white p-2 rounded-md"><div>Accuracy</div><div className="font-bold text-xl">{calculateAccuracy()}%</div></div>
          <div className="flex text-sm flex-col items-center justify-center bg-slate-700 text-white p-2 rounded-md"><div>Total Keys pressed</div><div className="font-bold text-xl">{inCorrectEntry+correctEntry}</div></div>
          <div className="flex text-sm flex-col items-center justify-center bg-slate-700 text-white p-2 rounded-md"><div>Correct keys pressed</div><div className="font-bold text-xl">{correctEntry}</div></div>
          <div className="flex text-sm flex-col items-center justify-center bg-slate-700 text-white p-2 rounded-md"><div>Incorrect Keys pressed</div><div className="font-bold text-xl">{inCorrectEntry}</div></div>
          <div className="flex text-sm flex-col items-center justify-center bg-slate-700 text-white p-2 rounded-md"><div>Keys per minute</div><div className="font-bold text-xl">{(inCorrectEntry+correctEntry)/5}</div></div>
        </div>}
      </div>
      </div>
    </div>
  );
}

export default App;
