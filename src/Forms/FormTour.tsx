import React, { useState, useEffect } from 'react';
import './FormTour.css';
import Footer from '../Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const FormTour = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch tour data from location state (for editing)
    const { tour } = location.state || {};


    const [tourName, setTourName] = useState(tour?.name || '');
    const [description, setDescription] = useState(tour?.description || '');
    const [price, setPrice] = useState(tour?.price || '');
    const [pictureUrl, setPictureUrl] = useState(tour?.pictureUrl || '');
    const [bookingCount, setBookingCount] = useState(tour?.bookingCount || 0);
    const [isPromo, setIsPromo] = useState(tour?.isPromo || 'false');
    const [originalPrice, setOriginalPrice] = useState(tour?.originalPrice || '');
    const [discountedPrice, setDiscountedPrice] = useState(tour?.discountedPrice || '');
    const [latitude, setLatitude] = useState(tour?.latitude || '');
    const [longitude, setLongitude] = useState(tour?.longitude || '');
    

    useEffect(() => {
        if (tour) {
            setTourName(tour.name || '');
            setDescription(tour.description || '');
            setPrice(tour.price || '');
            setPictureUrl(tour.pictureUrl || '');
            setBookingCount(tour.bookingCount || '');
            setIsPromo(tour.isPromo ? 'true' : 'false');
            setOriginalPrice(tour.originalPrice || '');
            setDiscountedPrice(tour.discountedPrice || '');
            setLatitude(tour.latitude || '');
            setLongitude(tour.longitude || '');
        }
    }, [tour]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (latitude < -90 || latitude > 90) {
            alert('Latitude must be between -90 and 90.');
            return;
        }
        if (longitude < -180 || longitude > 180) {
            alert('Longitude must be between -180 and 180.');
            return;
        }

        const newTour = {
            name: tourName,
            description,
            price,
            pictureUrl,
            bookingCount,
            isPromo,
            originalPrice,
            discountedPrice,
            latitude,
            longitude
        };

        try {
            const response = await fetch(tour ? `http://localhost:5000/api/tours/update/${tour._id}` : 'http://localhost:5000/api/tours/add', {
                method: tour ? 'PUT' : 'POST', // Use PUT for updating, POST for adding
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTour),
                credentials: 'include',
            });

            if (response.ok) {
                alert(tour ? 'Tour updated successfully!' : 'Tour added successfully!');
                navigate('/');
            } else {
                alert('Error saving tour!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving tour!');
        }

        // Reset form fields after submission
        setTourName('');
        setDescription('');
        setPrice('');
        setPictureUrl('');
        setIsPromo('false');
        setOriginalPrice('');
        setDiscountedPrice('');
        setLatitude('');
        setLongitude('');
    };

    return (
        <>
        <div className='tour-form-container'>
            <div className='form-container'>
                <div className="add-tour-header">
                    <h2>{tour ? 'Edit Tour' : 'Add More Places'}</h2>
                    <p>{tour ? 'Update the details of the selected tour.' : 'Expand our collection of exciting tourist destinations for customers to explore and book from.'}</p>
                </div>
                
                <form className="add-tour-form" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            required
                            value={tourName}
                            onChange={(e) => setTourName(e.target.value)}
                        />
                        <span className="placeholder">Name</span>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="placeholder">Description</span>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            required
                            value={pictureUrl}
                            onChange={(e) => setPictureUrl(e.target.value)}
                        />
                        <span className="placeholder">Picture Url</span>
                    </div>

                    <div className="input-box">
                        <input
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <span className="placeholder">Price</span>
                    </div>

                    {isPromo === 'true' && (
                        <>
                            <div className="input-box">
                                <input
                                    type="number"
                                    required
                                    value={originalPrice}
                                    onChange={(e) => setOriginalPrice(e.target.value)}
                                />
                                <span className="placeholder">Original Price</span>
                            </div>
                            <div className="input-box">
                                <input
                                    type="number"
                                    required
                                    value={discountedPrice}
                                    onChange={(e) => setDiscountedPrice(e.target.value)}
                                />
                                <span className="placeholder">Discounted Price</span>
                            </div>
                        </>
                    )}

                    <div className="input-box">
                        <input
                            type="number"
                            required
                            step="any"
                            min="-90"
                            max="90"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                        <span className="placeholder">Latitude</span>
                    </div>

                    <div className="input-box">
                        <input
                            type="number"
                            required
                            step="any"
                            min="-180"
                            max="180"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                        <span className="placeholder">Longitude</span>
                    </div>

                    <div className="promo-dropdown">
                        <label htmlFor="promo">Promo</label>
                        <select
                            id="promo"
                            name="promo"
                            onChange={(e) => setIsPromo(e.target.value)}
                            value={isPromo}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                    </div>

                    <button className="submit-button" type="submit">
                        {tour ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>
            
        </div>
        <Footer />
        </>
    );
};

export default FormTour;
