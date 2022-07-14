import React, {useContext} from 'react';
import {AppContext} from "../App";

function Key({ keyVal, bigKey = false, disabled, correct }) {
    const { board, setBoard, currentAttempt, setCurrentAttempt, wordSet, correctWord, gameOver, setGameOver } = useContext(AppContext);
    const endMsg = document.getElementById("gameovermsg");
    
    //keyboard events
    document.addEventListener('keypress', (event) => {
       console.log(event.key) ;
      });

    //select letter
    const selectLetter = () => {
        if(gameOver) return;
        if (keyVal === "ENTER"){
            if(currentAttempt.letterPos !== 5 ) return;
            let word = (board[currentAttempt.attempt][0] + board[currentAttempt.attempt][1] + board[currentAttempt.attempt][2] + board[currentAttempt.attempt][3]+ board[currentAttempt.attempt][4]).toLowerCase();
            if(word + "\r" === correctWord){
                endMsg.innerText = "nice job!";
                setGameOver(true);
                return;
            }
            if(currentAttempt.attempt > 4){
                endMsg.innerText = "The Correct word was " + correctWord;
                setGameOver(true);
                return;
            }
            if (wordSet.has(word + "\r")) {
                setCurrentAttempt({attempt: currentAttempt.attempt+1, letterPos: 0});
            }
            else{
                return;
            }


        }
        else if(keyVal === "DELETE"){
            if(currentAttempt.letterPos === 0) return;
            const newBoard = [...board];
            newBoard[currentAttempt.attempt][currentAttempt.letterPos-1] = "";
            setBoard(newBoard);
            setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos -1})    
        }
        else{
            if (currentAttempt.letterPos > 4) return;
            const newBoard = [...board];
            newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
            setBoard(newBoard);
            setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos +1})    
        }
    }

    return (
        <div className='key' id={bigKey ? "big" : disabled ? "disabled" : correct && "correct"} onClick={selectLetter}>
            { keyVal }
        </div>
      )

}

export default Key