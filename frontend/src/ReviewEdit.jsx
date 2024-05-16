import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewEdit() {
    const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
    const { id } = useParams();
    const [person, setPerson] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/reviews/${id}`,axiosConfig)
            .then(response => {
                const review = response.data[0];
                setPerson(review.person);
                setDescription(review.description);
            })
            .catch(error => console.error('Error fetching review:', error));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/reviews/${id}`, { person, description },axiosConfig)
            .then(() => navigate('/reviews'))
            .catch(error => console.error('Error updating review:', error));
    };

    return (
        <div>
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Person"
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default ReviewEdit;
