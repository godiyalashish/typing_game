import React, { useState, useEffect } from 'react';

const Timer = ({getRandomKey, focusInput, reset, calculateAccuracy, setInputDisable, setShowResults}) => {
const KEYS = new Set('asdfkl;');
  const [seconds, setSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    if(seconds === 0){
       console.log(calculateAccuracy());
       setInputDisable(true);
       setShowResults(true);
    }
    
    return () => {clearInterval(interval);};
  }, [isRunning, seconds]);

  const handleStart = () => {
    getRandomKey(KEYS);
    setIsRunning(true);
    focusInput();
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(300);
    reset();
    setInputDisable(false);
    handleStart();
    focusInput();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex flex-col items-center justify-center gap-y-3 mb-3'>
      <h2 className='text-3xl font-bold'>Timer: {formatTime(seconds)}</h2>
      {!isRunning && (
        <button onClick={handleStart} className='bg-green-200 p-1 pl-3 pr-3 rounded-md'>Start</button>
      )}
      {isRunning && (
        <button onClick={handleReset} className='bg-green-200 p-1 pl-3 pr-3 rounded-md'>Restart</button>
      )}
    </div>
  );
};

export default Timer;
