import React, { useState, useRef } from 'react';
import './index.css';
import pfp from './images/pfp.png';
import menu from './images/menu.png';
import MenuBar from './MenuBar';

const playlists = [
    {
        id: 1,
        title: 'Playlist 1',
        tracks: [
            {
                id: 1,
                title: 'Track 1',
                artist: 'Artist 1',
                thumbnail: 'https://picsum.photos/100/100?random=1',
                audio: 'https://www.example.com/playlist1/track1.mp3',
            },
            {
                id: 2,
                title: 'Track 2',
                artist: 'Artist 2',
                thumbnail: 'https://picsum.photos/100/100?random=2',
                audio: 'https://www.example.com/playlist1/track2.mp3',
            },
            // Add more tracks to this playlist
        ],
    },
    {
        id: 2,
        title: 'Playlist 2',
        tracks: [
            {
                id: 1,
                title: 'Track 1',
                artist: 'Artist 1',
                thumbnail: 'https://picsum.photos/100/100?random=3',
                audio: 'https://www.example.com/playlist2/track1.mp3',
            },
            {
                id: 2,
                title: 'Track 2',
                artist: 'Artist 2',
                thumbnail: 'https://picsum.photos/100/100?random=4',
                audio: 'https://www.example.com/playlist2/track2.mp3',
            },
            // Add more tracks to this playlist
        ],
    },
    // Add more playlists as needed
];
function Music() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(0);
    const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const playAudio = (audioUrl) => {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePlaylistChange = (index) => {
        setSelectedPlaylistIndex(index);
        setSelectedTrackIndex(null);
    };

    const handleThumbnailClick = (trackIndex) => {
        setSelectedTrackIndex(trackIndex);
        playAudio(playlists[selectedPlaylistIndex].tracks[trackIndex].audio);
    };

    const handleNextTrack = () => {
        if (selectedTrackIndex !== null && selectedTrackIndex < playlists[selectedPlaylistIndex].tracks.length - 1) {
            const nextTrackIndex = selectedTrackIndex + 1;
            setSelectedTrackIndex(nextTrackIndex);
            playAudio(playlists[selectedPlaylistIndex].tracks[nextTrackIndex].audio);
        }
    };

    const handlePrevTrack = () => {
        if (selectedTrackIndex !== null && selectedTrackIndex > 0) {
            const prevTrackIndex = selectedTrackIndex - 1;
            setSelectedTrackIndex(prevTrackIndex);
            playAudio(playlists[selectedPlaylistIndex].tracks[prevTrackIndex].audio);
        }
    };

    return (
        <div>
            <div className='chatcontainer'>
                <h1 className='header'>MUSIC</h1>
                <div className='navbar'>
                    <button className='menu' onClick={toggleMenu}>
                        <img className='menuicon' src={menu} alt="menu" />
                    </button>
                    <button className='pfp'>
                        <img className='pfpicon' src={pfp} alt="pfp" />
                    </button>
                </div>
                <div className="music-container">
                    <div className="playlist-selector">
                        {playlists.map((playlist, index) => (
                            <div
                                key={playlist.id}
                                className={`playlist-button ${selectedPlaylistIndex === index ? 'selected' : ''}`}
                                onClick={() => handlePlaylistChange(index)}
                            >
                                {playlist.title}
                            </div>
                        ))}
                    </div>
                    <div className="playlist">
                        {playlists[selectedPlaylistIndex].tracks.map((track, index) => (
                            <div
                                key={track.id}
                                className={`track-card ${selectedTrackIndex === index ? 'selected' : ''}`}
                                onClick={() => handleThumbnailClick(index)}
                            >
                                <img src={track.thumbnail} alt={track.title} />
                                <div className="track-info">
                                    <h3>{track.title}</h3>
                                    <p>{track.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`music-player ${selectedTrackIndex !== null ? 'active' : ''}`}>
                        <div className="player-controls">
                            <audio
                                ref={audioRef}
                                controls
                                autoPlay={isPlaying}
                                onEnded={handleNextTrack}
                            >
                                <source src={selectedTrackIndex !== null ? playlists[selectedPlaylistIndex].tracks[selectedTrackIndex].audio : ''} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                            <div className="track-progress">
                                {/* Implement track progress display here */}
                            </div>
                            <div className="volume-controls">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={audioRef.current ? audioRef.current.volume : 1}
                                    onChange={(e) => {
                                        if (audioRef.current) {
                                            audioRef.current.volume = parseFloat(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <div className="prev-next-buttons">
                                <button onClick={handlePrevTrack}>Previous</button>
                                <button onClick={handleNextTrack}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <MenuBar isOpen={isMenuOpen} onClose={toggleMenu} />
            </div>

        </div>
    )
}

export default Music


