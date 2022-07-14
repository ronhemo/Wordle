import React, {useContext} from 'react'
import {AppContext} from '../App'
import '../App.css';

function Toggle() {
    const {setDarkMode} =  useContext(AppContext);

    const change = (e) => {
        setDarkMode(e.target.checked);
    }

  return (
    <div>
        <input type="checkbox" id="switch"
            class="checkbox" onChange={change} />
        <label for="switch" class="toggle"/>
    </div>
  )
}

export default Toggle