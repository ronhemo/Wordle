import React, {useContext} from 'react'
import Key from './Key';
import {AppContext} from "../App";


function KeyBoard() {
    const { disabledChars, correctChars } = useContext(AppContext);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    return (
    <div className='keyboard'>
        <div className='line1'>{keys1.map((key) => {
            return <Key keyVal={key} disabled={disabledChars.includes(key)} correct={correctChars.includes(key)}/>;
        })}</div>
        <div className='line2'>{keys2.map((key) => {
            return <Key keyVal={key} disabled={disabledChars.includes(key)} correct={correctChars.includes(key)}/>;
        })}</div>
        <div className='line3'>
            <Key keyVal={"ENTER"} bigKey={true}/>
            {keys3.map((key) => {
            return <Key keyVal={key} disabled={disabledChars.includes(key)} correct={correctChars.includes(key)}/>;
        })}
            <Key keyVal={"DELETE"} bigKey={true}/>
        </div>
    </div>
  )
}

export default KeyBoard