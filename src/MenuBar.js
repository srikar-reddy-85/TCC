// // MenuBar.js
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImages, faVideo, faArrowAltCircleLeft, faMusic } from '@fortawesome/free-solid-svg-icons'

// function MenuBar({ isOpen, onClose }) {
//     return (
//         <div className={`menu-container ${isOpen ? 'open' : ''}`}>
//             <button className='menu-option' onClick={onClose} >
//                 IMAGES <FontAwesomeIcon icon={faImages} style={{ color: "#ffffff", }} /></button>
//             <button className='menu-option' onClick={onClose}>
//                 VIDEOS <FontAwesomeIcon icon={faVideo} style={{ color: "#ffffff", }} /> </button>
//             <button className='menu-option' onClick={onClose}>
//                 MUSIC <FontAwesomeIcon icon={faMusic} style={{ "--fa-primary-color": "#c7c7c7", "--fa-secondary-color": "#ffffff", }} />
//             </button>
//             <button className='back-button' onClick={onClose}>
//                 BACK <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ color: "#ffffff", }} />
//             </button>

//         </div>
//     );
// }

// export default MenuBar;


import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faVideo, faMusic, faHome } from '@fortawesome/free-solid-svg-icons';

function MenuBar({ isOpen, onClose }) {
    return (
        <div className={`menu-container ${isOpen ? 'open' : ''}`}>
            <Link to="/images" className='menu-option' onClick={onClose}>
                IMAGES <FontAwesomeIcon icon={faImages} style={{ color: "#ffffff", }} />
            </Link>
            <Link to="/videos" className='menu-option' onClick={onClose}>
                VIDEOS <FontAwesomeIcon icon={faVideo} style={{ color: "#ffffff", }} />
            </Link>
            <Link to="/music" className='menu-option' onClick={onClose}>
                MUSIC <FontAwesomeIcon icon={faMusic} style={{ "--fa-primary-color": "#c7c7c7", "--fa-secondary-color": "#ffffff", }} />
            </Link>
            <Link to="/" className='back-button' onClick={onClose}>
                HOME <FontAwesomeIcon icon={faHome} style={{ color: "#ffffff", }} />
            </Link>
        </div>
    );
}

export default MenuBar;





