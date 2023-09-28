// import { React, useState } from 'react'
// import './index.css'
// import pfp from './images/pfp.png'
// import menu from './images/menu.png'
// import Chatcard from './Chatcard'
// import Movies from './Movies'
// import MenuBar from './MenuBar'
// function Chat() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };
//     return (

//         <div className='chatcontainer' >
//             <h1 className='header'>TCC</h1>
//             <div className='navbar'>

//                 <button className='menu' onClick={toggleMenu}>
//                     <img className='menuicon' src={menu} alt="menu" />
//                 </button>
//                 <button className='pfp'>
//                     <img className='pfpicon' src={pfp} alt="pfp" />
//                 </button>

//             </div>
//             <Chatcard />
//             <div>
//                 <Movies />
//             </div>
//             <div>
//                 <h1 className='header'>SERIES</h1>
//             </div>
//             <div>
//                 <h1 className='header'>MUSIC</h1>
//             </div>
//             <MenuBar isOpen={isMenuOpen} onClose={toggleMenu} />
//         </div>


//     )
// }

// export default Chat


// Chat.js

import React, { useState } from 'react';
import '../index.css';
import pfp from '../images/pfp.png';
import menu from '../images/menu.png';
import Chatcard from './Chatcard';
import Movies from '../moviecomp/Movies';
import Series from '../seriescomp/Series';
import Anime from '../animecomp/Anime';
import MenuBar from '../MenuBar';

function Chat() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='chatcontainer'>
            <h1 className='header'>TCC</h1>
            <div className='navbar'>
                <button className='menu' onClick={toggleMenu}>
                    <img className='menuicon' src={menu} alt="menu" />
                </button>
                <button className='pfp'>
                    <img className='pfpicon' src={pfp} alt="pfp" />
                </button>
            </div>
            <Chatcard />
            <div>
                <Movies />
            </div>
            <div>
                <Series />
            </div>
            <div>
                <Anime />
            </div>
            <MenuBar isOpen={isMenuOpen} onClose={toggleMenu} />
        </div>
    );
}

export default Chat;




