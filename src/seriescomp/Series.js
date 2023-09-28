
import React from 'react';
import Loki from '../images/series/Loki.jpg'
import Moving from '../images/series/Moving.jpg'
import One_piece from '../images/series/One_piece.jpg'
import Star_Wars from '../images/series/Star_Wars.jpg'
import The_continental from '../images/series/The_continental.jpg'
import SeriesCard from './SeriesCard';



const dummyMovies = [
    {
        title: 'LOKI',
        thumbnail: Loki,
        src: ''
    },
    {
        title: 'MOVING',
        thumbnail: Moving,
        src: ''
    },
    {
        title: 'ONE PIECE',
        thumbnail: One_piece,
        src: ''
    },
    {
        title: 'STAR WARS',
        thumbnail: Star_Wars,
        src: ''
    },
    {
        title: 'CONTINENTAL',
        thumbnail: The_continental,
        src: ''
    },
];

function Series() {
    return (
        <div>
            <h2 className='mheader'>SERIES</h2>
            <div className="movie-list">
                {dummyMovies.map((movie, index) => (
                    <SeriesCard key={index} title={movie.title} thumbnail={movie.thumbnail} videoSrc={movie.src} />
                ))}

            </div>
        </div>
    );
}

export default Series
