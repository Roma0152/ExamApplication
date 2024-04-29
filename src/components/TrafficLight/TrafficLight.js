import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

const TrafficLight = () => {
  const [currentColor, setCurrentColor] = useState('red');

  const [pedestrianColor, setPedestrianColor] = useState('wait');

  const [clickStats, setClickStats] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });

  const changeColor = () => {
    if (currentColor === 'red') {
      setCurrentColor('green');
      setPedestrianColor('wait');
    } else if (currentColor === 'green') {
      setCurrentColor('yellow');
      setPedestrianColor('wait'); 
    } else {
      setCurrentColor('red');
      setPedestrianColor('go'); 
    }
  };

  useEffect(() => {
    const intervalId = setInterval(changeColor, 10000);
    return () => clearInterval(intervalId);
  }, [currentColor,changeColor]);

  const handleCircleClick = (color) => {
    if (color === currentColor) {
      setClickStats({
        ...clickStats,
        [color]: clickStats[color] + 1,
      });
    }
  };

  const handleButtonClick = () => {
    if (pedestrianColor === 'wait' && currentColor === 'red') {
      setPedestrianColor('go');
    } else if (pedestrianColor === 'go' && currentColor === 'red') {
      setPedestrianColor('wait');
    }
  };

  return (
    <div>
      <div className="traffic-light-container">
        <div
          onClick={() => handleCircleClick('red')}
          className={`circle ${currentColor === 'red' ? 'red' : ''}`}
        ></div>

        <div
          onClick={() => handleCircleClick('yellow')}
          className={`circle ${currentColor === 'yellow' ? 'yellow' : ''}`}
        ></div>

        <div
          onClick={() => handleCircleClick('green')}
          className={`circle ${currentColor === 'green' ? 'green' : ''}`}
        ></div>

        <div className="click-stats">
          <p>Статистика натискань:</p>
          <p>Червоне: {clickStats.red}</p>
          <p>Жовте: {clickStats.yellow}</p>
          <p>Зелене: {clickStats.green}</p>
        </div>
      </div>

      <div className="pedestrian-light-container">
        <div
          className={`pedestrian-light ${
            pedestrianColor === 'go' ? 'pedestrian-green' : 'pedestrian-red'
          }`}
        ></div>

        <button onClick={handleButtonClick}>Перемкнути пішохідний світлофор</button>
      </div>
    </div>
  );
};

export default TrafficLight;
