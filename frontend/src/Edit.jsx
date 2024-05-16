import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
    const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        level: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8081/view/' + id,axiosConfig)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setValues({
                        name: res.data[0].name || '',
                        level: res.data[0].level || 0
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const handleLevelChange = (e) => {
        const levelValue = e.target.value;
        setValues({ ...values, level: levelValue === "" ? 0 : Number(levelValue) });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/' + id, values,axiosConfig)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <form onSubmit={handleUpdate}>
                    <h2>Update Tea</h2>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' value={values.name}
                               onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Level of spice</label>
                        <input type="number" placeholder='Enter level of spice' className='form-control' value={values.level}
                               onChange={handleLevelChange} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
