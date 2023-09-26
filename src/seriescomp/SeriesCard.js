import React, { useState } from 'react';

function SeriesCard({ title, thumbnail, videoSrc }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div className="movie-card">
            <img src={thumbnail} alt={title} className="movie-thumbnail" />
            <p className="movie-title">{title}</p>
            <button className="viewm" onClick={openDialog}>
                VIEW
            </button>
            {isDialogOpen && (
                <div className='dialog-container'>
                    <div className="dialog">
                        <button className="back-buttonm" onClick={closeDialog}>
                            x
                        </button>
                        <h2 className="movie-title">{title}</h2>
                        <video controls>
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SeriesCard
