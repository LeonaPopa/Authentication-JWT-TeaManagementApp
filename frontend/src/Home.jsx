import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import Logout from './Logout';
function Home(){
    const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/',axiosConfig)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete =(id) =>{
        axios.delete('http://localhost:8081/delete/'+id,axiosConfig)
            .then(res => {
                location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div>
                <Logout></Logout>
            </div>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Tea List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'></Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr style={{display: "flex", justifyContent: "space-evenly"}}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Level of Spice</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tea, index)=>{
                            return <tr key={index} style={{display: "flex", justifyContent: "space-between"}}>
                                    <td style={{width: "15vw"}}>{tea.id}</td>
                                    <td style={{width: "15vw"}}>{tea.name}</td>
                                    <td style={{width: "15vw"}}>{tea.level}</td>
                                    <td style={{width: "15vw"}}>
                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                            <button><Link style={{color: "white", textDecoration: "none"}}
                                                          to={`/view/${tea.id}`}
                                                          className='btn btn-sm btn-info'>View</Link></button>
                                            <button><Link style={{color: "white", textDecoration: "none"}}
                                                          to={`/edit/${tea.id}`}
                                                          className='btn btn-sm btn-primary mx-2'>Edit</Link></button>
                                            <button onClick={() => handleDelete(tea.id)}
                                                    className='btn btn-sm btn-danger'>Delete
                                            </button>
                                        </div>
                                    </td>
                            </tr>
                        })}
                        </tbody>
                        </table>
            </div>
        </div>
    )
}

export default Home