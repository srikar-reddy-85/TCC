
import React from 'react';
import AOT from '../images/anime/AOT.jpg'
import Bleach from '../images/anime/Bleach.jpg'
import One_piece from '../images/anime/One_piece.jpg'
import Blue_lock from '../images/anime/Blue_lock.jpg'
import Jujutsu_Kaisen from '../images/anime/Jujutsu_Kaisen.jpg'
import AnimeCard from './AnimeCard';



const dummyMovies = [
    {
        title: 'AOT',
        thumbnail: AOT,
        src: ''
    },
    {
        title: 'BLEACH',
        thumbnail: Bleach,
        src: ''
    },
    {
        title: 'ONE PIECE',
        thumbnail: One_piece,
        src: ''
    },
    {
        title: 'BLUE LOCK',
        thumbnail: Blue_lock,
        src: ''
    },
    {
        title: 'J K',
        thumbnail: Jujutsu_Kaisen,
        src: ''
    },
];

function Anime() {
    return (
        <div>
            <h2 className='mheader'>ANIME</h2>
            <div className="movie-list">
                {dummyMovies.map((movie, index) => (
                    <AnimeCard key={index} title={movie.title} thumbnail={movie.thumbnail} videoSrc={movie.src} />
                ))}

            </div>
        </div>
    );
}

export default Anime

