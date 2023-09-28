
import React, { useState, useEffect } from 'react';
import './index.css';
import pfp from './images/pfp.png';
import menu from './images/menu.png';
import MenuBar from './MenuBar';
import './image-grid.css'; // Import your custom CSS for the grid layout
import './image-modal.css'; // Import your custom CSS for the modal overlay
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashCan, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001';

function Images() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [images, setImages] = useState([]); // State to store retrieved images

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleDeleteImage = (imageId) => {
        // Send a DELETE request to your server to delete the image
        axios.delete(`/images/${imageId}`)
            .then((response) => {
                console.log('Image deleted:', response.data);
                window.location.reload();
                getImages();
            })
            .catch((error) => {
                console.error('Error deleting image:', error);
            });
    };


    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('description', description);

            axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {

                    console.log('Response Data:', response.data);
                    setUploadedImage(response.data.fileInfo);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response) {
                        console.error('Axios Response:', error.response.data);
                    }
                });
        } else {
            alert('Please select a file to upload.');
        }
    };

    // Function to retrieve images from the database
    const getImages = () => {
        axios.get('/images')
            .then((response) => {
                setImages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    };

    // Call getImages when the component mounts
    useEffect(() => {
        getImages();
    }, []); // The empty array [] ensures that this effect runs only once on mount

    console.log(images);
    console.log(uploadedImage);

    // const images = [
    //     {
    //         src: 'https://via.placeholder.com/200',
    //         description: ''
    //     },
    //     {
    //         src: 'https://via.placeholder.com/400',
    //         description: ''
    //     },
    //     {
    //         src: 'https://via.placeholder.com/600',
    //         description: ''
    //     },
    //     {
    //         src: 'https://via.placeholder.com/800',
    //         description: ''
    //     },
    //     {
    //         src: 'https://via.placeholder.com/1200',
    //         description: ''
    //     },
    //     {
    //         src: 'https://picsum.photos/200/300',
    //         description: ''
    //     },
    //     {
    //         src: 'https://picsum.photos/400/600',
    //         description: ''
    //     },
    //     {
    //         src: 'https://picsum.photos/600/900',
    //         description: '',
    //     },
    //     {
    //         src: 'https://picsum.photos/800/1200',
    //         description: '',
    //     },
    //     {
    //         src: 'https://picsum.photos/1200/1800',
    //         description: '',
    //     },
    //     {
    //         src: 'https://source.unsplash.com/random/200x300',
    //         description: '',
    //     },
    //     {
    //         src: 'https://source.unsplash.com/random/400x600',
    //         description: '',
    //     },
    //     {
    //         src: 'https://source.unsplash.com/random/600x900',
    //         description: '',
    //     },
    //     {
    //         src: 'https://source.unsplash.com/random/800x1200',
    //         description: '',
    //     },
    //     {
    //         src: 'https://source.unsplash.com/random/1200x1800',
    //         description: '',
    //     },
    //     {
    //         src: 'https://placeimg.com/200/300/any',
    //         description: '',
    //     },
    //     {
    //         src: 'https://placeimg.com/400/600/any',
    //         description: '',
    //     },
    //     {
    //         src: 'https://placeimg.com/600/900/any',
    //         description: '',
    //     },
    //     {
    //         src: 'https://placeimg.com/800/1200/any',
    //         description: '',
    //     },
    //     {
    //         src: 'https://placeimg.com/1200/1800/any',
    //         description: '',
    //     },
    // ];

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const closeImage = () => {
        setSelectedImageIndex(null);
    };

    const showNextImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const showPreviousImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    return (
        <div>
            <div className='chatcontainer'>
                <h1 className='header'>IMAGES</h1>
                <div className='navbar'>
                    <button className='menu' onClick={toggleMenu}>
                        <img className='menuicon' src={menu} alt="menu" />
                    </button>
                    <button className='pfp'>
                        <img className='pfpicon' src={pfp} alt="pfp" />
                    </button>
                </div>
                <div className="file-upload-container">
                    <h2>IMAGE UPLOAD</h2>
                    <label htmlFor="file" className="upload-area">
                        <div className="file-input-wrapper">
                            {/* Your file input */}
                            <input
                                type="file"
                                id="file"
                                className="input-file"
                                onChange={handleFileChange}
                            />
                            <h2>Click or drag and drop to upload</h2>
                        </div>
                        {selectedFile && <p className='selected-file'>{selectedFile.name}</p>}
                    </label>
                    <input type='text'
                        placeholder=" IMAGE DESCRIPTION"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <button className='upload-button' onClick={handleUpload}>UPLOAD</button>
                    <h2 className='title'>APES</h2>
                </div>

                <div className='image-grid'>
                    {images.map((image, index) => (
                        <div>
                            <div key={index}
                                className='image-container'
                                onClick={() => handleImageClick(index)}>
                                <img className='image'
                                    src={`http://192.168.2.8:3001/uploads/${image.filename}`} // Use the /uploads URL path
                                    alt={image.filename}
                                />
                                <p className='img-description'>{image.description}</p>
                            </div>
                            {/* <div><button className='delete-button' onClick={() => handleDeleteImage(image.id)}>DELETE</button>
                            </div> */}
                        </div>
                    ))}
                </div>

                {selectedImageIndex !== null && (
                    <div className='image-modal'>
                        <div className='modal-content'>
                            {selectedImageIndex > 0 && (
                                <button className='prev-button' onClick={showPreviousImage}>
                                    <FontAwesomeIcon icon={faArrowLeft} size='xlarge' style={{ color: "#ffffff" }} />
                                </button>
                            )}
                            <img height={600} width={850} src={`http://192.168.2.8:3001/uploads/${images[selectedImageIndex].filename}`} alt={images[selectedImageIndex].description} />
                            <div><button className='delete-button' onClick={() => handleDeleteImage(images[selectedImageIndex].id)}><FontAwesomeIcon icon={faTrashCan} size='xlarge' style={{ color: "red" }} /></button>
                            </div>

                            {selectedImageIndex < images.length - 1 && (
                                <button className='next-button' onClick={showNextImage}>
                                    <FontAwesomeIcon icon={faArrowRight} size='xlarge' style={{ color: "#ffffff" }} />
                                </button>
                            )}

                            <button className='close-buttoni' onClick={closeImage} >
                                <FontAwesomeIcon icon={faX} style={{ color: "#ffffff" }} />
                            </button>
                        </div>
                    </div>
                )}

                <MenuBar isOpen={isMenuOpen} onClose={toggleMenu} />
            </div>
        </div>
    );
}

export default Images;
