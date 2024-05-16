import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link,Navigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Home from './Home';
import Create from './Create';
import Edit from './Edit';
import View from './View';
import ReviewCreate from './ReviewCreate';
import ReviewEdit from './ReviewEdit';
import ReviewList from './ReviewList';
import LoginPage from './LoginPage';
import Validation from './Validation';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        setToken(tokenFromLocalStorage);
    }, [token]);

    return (
        <Router>
            <div className="container">
                <nav>
                    <button style={{color: "white", textDecoration: "none"}}><Link to="/">Home</Link></button>
                    <button style={{color: "white", textDecoration: "none"}}><Link to="/create">Create Tea</Link></button>
                    <button style={{color: "white", textDecoration: "none"}}><Link to="/reviews">Reviews</Link></button>
                </nav>
                <Routes>
                    <Route path="/login" element={<LoginPage setToken={setToken}></LoginPage>} />
                    <Route path="/validation" element={<Validation></Validation>} />
                    {token &&<Route path="/" element={<Home/>} />}
                    {token &&<Route path="/create" element={<Create/>} />}
                    {token &&<Route path="/edit/:id" element={<Edit/>} />}
                    {token &&<Route path="/view/:id" element={<View/>} />}
                    {token &&<Route path="/reviews" element={<ReviewList/>} />}
                    {token &&<Route path="/review/create" element={<ReviewCreate/>} />}
                    {token &&<Route path="/review/edit/:id" element={<ReviewEdit/>} />}
                    {!token && (
                    <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
