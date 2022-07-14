import './App.css';
import React, { useState, createContext, useEffect } from 'react';
import Board from "./components/Board"
import KeyBoard from './components/KeyBoard';
import wordBank from "./wordle-bank.txt"
import Toggle from './components/Toggle';

export const AppContext = createContext();

function App() {
  const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
  ]
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt:0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [disabledChars, setDisabledChars] = useState([]);
  const [correctChars, setCorrectChars] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  //runs once at execution
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        const wordArr = result.split("\n");
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        wordSet = new Set(wordArr);
      });
    return { wordSet, todaysWord };
  };

  const displayRules = () => {
    alert("Guess the WORDLE in six tries.\nEach guess must be a valid five-letter word.\nHit the enter button to submit.\nAfter each guess, the color of the tiles will change to show how close your guess was to the word.");
  }

  if(darkMode){
    return (
      <div className="DarkApp" id="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <center>
          <AppContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, wordSet, setWordSet, correctWord, setCorrectWord, gameOver, setGameOver, disabledChars, setDisabledChars, correctChars, setCorrectChars, darkMode, setDarkMode }}>
          <nav style={{display:"flex", justifyContent:"space-between"}}>
              <a onClick={displayRules}><i class="fa fa-question-circle questionmark"  style={{fontSize:"24px"}}></i></a>      
              <h1>Wordle</h1>
              <Toggle/>
            </nav>
            <Board/>
            <div id="gameovermsg"></div>
            <KeyBoard/>
          </AppContext.Provider>
        </center>
      </div>
    );
  }
  else{
    return (
      <div className="LightApp" id="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <center>
        <AppContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, wordSet, setWordSet, correctWord, setCorrectWord, gameOver, setGameOver, disabledChars, setDisabledChars, correctChars, setCorrectChars, darkMode, setDarkMode }}>
            <nav style={{display:"flex", justifyContent:"space-between"}}>
              <a onClick={displayRules}><i class="fa fa-question-circle questionmark"  style={{fontSize:"24px"}}></i></a>      
              <h1>Wordle</h1>
              <Toggle/>
            </nav>

            <Board/>
            <div id="gameovermsg"></div>
            <KeyBoard/>
          </AppContext.Provider>
        </center>
      </div>
    );
  }

}

export default App;
