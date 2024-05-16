import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReviewList() {
    const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/reviews',axiosConfig)
            .then(response => setReviews(response.data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const handleDelete =(id) =>{
        axios.delete('http://localhost:8081/reviews/delete/'+id,axiosConfig)
            .then(res => {
                location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Reviews</h1>
            <button style={{color: "white", textDecoration: "none"}} className='btn btn-sm btn-primary mx-2'><Link to="/review/create">Create Review</Link></button>
                <ul>
                    {reviews.map(review => (
                    <li key={review.id}>
                        <h3>Person: {review.person}</h3>
                        <p>Description: {review.description}</p>
                        <p>Review of the tea: {review.tea_id}</p>
                        <button style={{color: "white", textDecoration: "none"}} className='btn btn-sm btn-primary mx-2'><Link to={`/review/edit/${review.id}`}>Edit</Link></button>
                        <button onClick={() => handleDelete(review.id)} className='btn btn-sm btn-danger'>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReviewList;
