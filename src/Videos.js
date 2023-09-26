// import React, { useState } from 'react';
// import './index.css';
// import pfp from './images/pfp.png';
// import menu from './images/menu.png';
// import MenuBar from './MenuBar';

// function Videos() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };
//     return (
//         <div>
//             <div className='chatcontainer'>
//                 <h1 className='header'>VIDEOS</h1>
//                 <div className='navbar'>
//                     <button className='menu' onClick={toggleMenu}>
//                         <img className='menuicon' src={menu} alt="menu" />
//                     </button>
//                     <button className='pfp'>
//                         <img className='pfpicon' src={pfp} alt="pfp" />
//                     </button>
//                 </div>
//                 <MenuBar isOpen={isMenuOpen} onClose={toggleMenu} />
//             </div>

//         </div>
//     )
// }

// export default Videos
// ---------------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import './index.css';
import pfp from './images/pfp.png';
import menu from './images/menu.png';
import MenuBar from './MenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';

function Videos() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const videos = [
        {
            title: 'VIDEO 1',
            src: 'dQw4w9WgXcQ',
        },
        {
            title: 'VIDEO 2',
            src: '3tmd-ClpJxA',
        },
        {
            title: 'VIDEO 3',
            src: 'zQSwPEqBiLU',
        },
        {
            title: 'VIDEO 4',
            src: 'QdHvS0D1zAI',
        },
        {
            title: 'VIDEO 5',
            src: 'w4cHu49i10Q',
        },
    ];

    const openVideo = (index) => {
        setSelectedVideoIndex(index);
    };

    const closeVideo = () => {
        setSelectedVideoIndex(null);
    };

    const showNextVideo = () => {
        if (selectedVideoIndex !== null && selectedVideoIndex < videos.length - 1) {
            setSelectedVideoIndex(selectedVideoIndex + 1);
        }
    };

    const showPreviousVideo = () => {
        if (selectedVideoIndex !== null && selectedVideoIndex > 0) {
            setSelectedVideoIndex(selectedVideoIndex - 1);
        }
    };

    return (
        <div>
            <div className='chatcontainer'>
                <h1 className='header'>VIDEOS</h1>
                <div className='navbar'>
                    <button className='menu' onClick={toggleMenu}>
                        <img className='menuicon' src={menu} alt="menu" />
                    </button>
                    <button className='pfp'>
                        <img className='pfpicon' src={pfp} alt="pfp" />
                    </button>
                </div>

                <div className='video-grid'>
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className='video-container'
                            onClick={() => openVideo(index)}
                        >
                            <img className='thumbnail'
                                src={`https://img.youtube.com/vi/${video.src}/maxresdefault.jpg`}
                                alt={video.title}
                            />
                            <div className='video-title'>{video.title}</div>
                        </div>
                    ))}
                </div>

                {selectedVideoIndex !== null && (
                    <div className='video-modal'>
                        <div className='modal-content'>
                            <iframe
                                width="860"
                                height="515"
                                src={`https://www.youtube.com/embed/${videos[selectedVideoIndex].src}`}
                                title={videos[selectedVideoIndex].title}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            <button className='close-buttoni' onClick={closeVideo} >
                                <FontAwesomeIcon icon={faX} style={{ color: "#ffffff" }} />
                            </button>
                            {selectedVideoIndex > 0 && (
                                <button className='prev-button' onClick={showPreviousVideo}>
                                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff" }} />
                                </button>
                            )}
                            {selectedVideoIndex < videos.length - 1 && (
                                <button className='next-button' onClick={showNextVideo}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffffff" }} />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <MenuBar isOpen={isMenuOpen} onClose={toggleMenu} />
            </div>
        </div>
    );
}

export default Videos;




