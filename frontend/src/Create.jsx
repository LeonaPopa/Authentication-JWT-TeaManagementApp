import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Create(){
    const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
    const [values, setValues] = useState({
        name: '',
        level: 0
    })
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/tea/',values,axiosConfig)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err))
    };
    const handleLevelChange = (e) => {
        const levelValue = e.target.value;
        setValues({...values, level: levelValue === "" ? 0 : Number(levelValue)});
    };
    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Add Tea</h2>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                                onChange={e =>setValues({...values, name: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Level of spice</label>
                        <input type="number" placeholder='Enter level of spice' className='form-control'
                               onChange={handleLevelChange}/>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create