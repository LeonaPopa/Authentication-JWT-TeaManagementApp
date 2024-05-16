import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReviewCreate() {
    const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
    const [values, setValues] = useState({
        person: '',
        description: '',
        tea_id: 0
    })
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/reviews/review/', values,axiosConfig)
            .then(res => {
                console.log(res);
                navigate('/reviews')
            })
            .catch(error => console.error('Error creating review:', error));
    };
    const handleIdChange = (e) => {
        const levelValue = e.target.value;
        setValues({...values, tea_id: levelValue === "" ? 0 : Number(levelValue)});
    };

    return (
        <div>
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Person</label>
                    <input type="text" placeholder='Enter Person' className='form-control'
                           onChange={e => setValues({...values, person: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" placeholder='Enter Description' className='form-control'
                           onChange={e => setValues({...values, description: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Tea Id</label>
                    <input type="number" placeholder='Enter tea id' className='form-control'
                           onChange={handleIdChange}/>
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    );
}

export default ReviewCreate;
