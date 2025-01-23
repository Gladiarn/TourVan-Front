import React, { useState, useEffect } from 'react';
import './FormVan.css'; // Optional CSS for styling
import Footer from '../Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const FormVan = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const { van } = location.state || {};

    const [name, setName] = useState(van?.name || '');
    const [totalSeats, setTotalSeats] = useState(van?.totalSeats || '');
    const [plateNumber, setPlateNumber] = useState(van?.plateNumber || '');
    const [driverName, setDriverName] = useState(van?.driverName || '');

    useEffect(() => {
        if (van) {
            setName(van.name || '');
            setTotalSeats(van.totalSeats || '');
            setPlateNumber(van.plateNumber || '');
            setDriverName(van.driverName || '');
        }
    }, [van]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (totalSeats <= 0) {
            alert('Total seats must be greater than zero.');
            return;
        }

        const newVan = {
            name,
            totalSeats,
            plateNumber,
            driverName,
        };

        try {
            const response = await fetch(
                van ? `http://localhost:5000/api/van/edit/${van._id}` : 'http://localhost:5000/api/van/add',
                {
                    method: van ? 'PUT' : 'POST', // PUT for updating, POST for adding
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newVan),
                    credentials: 'include',
                }
            );

            if (response.ok) {
                alert(van ? 'Van updated successfully!' : 'Van added successfully!');
                navigate('/'); // Redirect to the homepage or van list page
            } else {
                alert('Error saving van details!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving van details!');
        }

        // Reset form fields after submission
        setName('');
        setTotalSeats('');
        setPlateNumber('');
        setDriverName('');
    };

    return (
        <>
            <div className='van-form-container'>
                <div className='form-container'>
                    <div className="add-van-header">
                        <h2>{van ? 'Edit Van' : 'Add New Van'}</h2>
                        <p>{van ? 'Update the details of the selected van.' : 'Add a new van to the system for better fleet management.'}</p>
                    </div>
                    <form className="add-van-form" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className="placeholder">Van Name</span>
                        </div>
                        <div className="input-box">
                            <input
                                type="number"
                                required
                                min="1"
                                value={totalSeats}
                                onChange={(e) => setTotalSeats(e.target.value)}
                            />
                            <span className="placeholder">Total Seats</span>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                required
                                value={plateNumber}
                                onChange={(e) => setPlateNumber(e.target.value)}
                            />
                            <span className="placeholder">Plate Number</span>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                required
                                value={driverName}
                                onChange={(e) => setDriverName(e.target.value)}
                            />
                            <span className="placeholder">Driver Name</span>
                        </div>
                        <button className="submit-button" type="submit">
                            {van ? 'Update' : 'Add'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FormVan;
