import React, { useRef, useState,useEffect } from 'react';
import "./NavBar.css"
import menuIcon from "./menu.svg"
function NavBar(){
    const [menuToggled,nextMenuState] = useState(false)



    let isPortrait = window.screen.availWidth < window.screen.availHeight
    if(isPortrait){
        return <div className="navBar">
            <div className="portraitNavBar">
                <NavEl redirect="welcome">
                    <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg">
                    </img>
                </NavEl>
                <img src={menuIcon} className="hamburgerIcon" onClick={() => nextMenuState(!menuToggled)}>
                </img>
            </div>
            <div style={{display: menuToggled ? "block" : "none"}} class="portraitNavbarHolder">
                <NavEl redirect="Members">Membri</NavEl>
                <NavEl redirect="Composition">Composizione</NavEl>
                <NavEl redirect="ObbiettiviEValori">Obbiettivi e valori</NavEl>
            </div>
        </div>
    }
    return (
        <div className="navBar">
            <NavEl redirect="welcome">
                <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg">
                </img>
            </NavEl>
            <NavEl redirect="Members">Membri</NavEl>
            <NavEl redirect="Composition">Composizione</NavEl>
            <NavEl redirect="ObbiettiviEValori">Obbiettivi e valori</NavEl>
        </div>
    )
}

function NavEl(props){

    function handleClick(){
        document.getElementById(props.redirect).scrollIntoView({behavior: "smooth",  block: "center"});
    }
    return (
        <a className="navEl" onClick={handleClick}>
            {props.children}
        </a>
    )
}
export default NavBar