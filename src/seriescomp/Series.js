
import React from 'react';
import hosteldays1 from '../images/movies/HOSTELDAYS.jpg'
import bro from '../images/movies/BRO.jpg'
import ustaad from '../images/movies/USTAAD.jpg'
import narayanaco from '../images/movies/NARAYANA & CO.jpg'
import pizza3 from '../images/movies/PIZZA3.jpg'
import hawa from '../images/movies/HAWA.jpg'
import hosteldays from '../videos/movies/hosteldays.mp4'
import SeriesCard from './SeriesCard';



const dummyMovies = [
    {
        title: 'HOSTEL DAYS',
        thumbnail: hosteldays1,
        src: hosteldays
    },
    {
        title: 'BRO',
        thumbnail: bro,
        src: ''
    },
    {
        title: 'USTAAD',
        thumbnail: ustaad,
        src: ''
    },
    {
        title: 'NARAYANA&CO',
        thumbnail: narayanaco,
        src: ''
    },
    {
        title: 'PIZZA3',
        thumbnail: pizza3,
        src: ''
    },
    {
        title: 'HAWA',
        thumbnail: hawa,
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
