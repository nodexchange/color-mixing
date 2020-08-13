import React, { useState, useEffect } from 'react';

const ColorMixingBtn = props => (
  <button
    className="colorBtn"
    style={{ backgroundColor: props.colorMixing }}
    onClick={() => props.onClick(props.colorMixing)}
  >
  </button>
);

const MixedColor = props => (
  <div
    className = 'mixedColor'
    style={{ backgroundColor: props.mixedColor}} 
  >
  </div>
);

const PlayAgain = props => (
  <div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);

const colors = {
  'orange': ['red', 'yellow'],
  'grey': ['black', 'white'],
  'purple': ['red', 'blue'],
  'green': ['yellow', 'blue'],
  'brown': ['red', 'green']
};
const colorsMixedArr = Object.keys(colors);
let colorMixingArr = [];
colorsMixedArr.forEach((key) => {
  colorMixingArr = colorMixingArr.concat(colors[key]);
});
colorMixingArr = Array.from(new Set(colorMixingArr));


const setGame = () => {
  const [colorsMixed, setColorsMixed] = useState(colorsMixedArr);
  const [colorLeft, setColorLeft] = useState(mixedColor);
  const [status, setStatus] = useState('');
  const [chosenColors, setChosenColors] = useState([]);
  const [gameStatus, setGameStatus] = useState('incomplete');

  const ind = Math.floor(Math.random() * colorsMixed.length);
  const mixedColor = colorsMixed[ind];
  const correctAns = colors[mixedColor];

  const mixCheck = (chosenColors) => {
    setColorsMixed(colorsMixed.filter(c => c !== mixedColor));
    if (correctAns.sort().join() === chosenColors.sort().join()) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
    if (colorsMixed.length === 1) {
      setGameStatus('complete');
    } else {
      const newColorLeft = colorsMixed[Math.floor(Math.random() * colorsMixed.length)];
      setChosenColors([]);
      setColorLeft(newColorLeft);
    }
  }
  return { mixedColor, status, chosenColors, mixCheck, gameStatus };
}

const ColorGame = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
}

const Game = props => {
  const {
    mixedColor,
    status,
    chosenColors,
    mixCheck,
    gameStatus,
  } = setGame();

  const onBtnClick = (chosenColor) => {
    chosenColors.push(chosenColor);
    if (chosenColors.length >= 2) {
      mixCheck(chosenColors);
    }
  }
  return (
    <div>
      <h1>Color Mixing Game</h1>
      {gameStatus === 'incomplete' ? (
        <div className="body">
          <div className="left">
            <MixedColor mixedColor={mixedColor} />
          </div>
          <div className="right">
            {colorMixingArr.map((colorMixing, index) => (
              <ColorMixingBtn
                key={index}
                colorMixing={colorMixing}
                onClick={onBtnClick}
              />
            ))}
          </div>
        </div>
      ) : (
        <PlayAgain onClick={props.startNewGame} />
      )
      }
      
      <div>
        {status === 'correct'
          ? (<p>Correct!</p>)
          : status === 'incorrect'
            ? (<p>Incorrect!</p>)
            : (<p>Please select</p>)}
      </div>
    </div>
  );
};

export default ColorGame;