import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
    return (
        <div >
            <h2 >Welcome to The Finance Tracker</h2>
            <div >
                <Link to="/login">
                    Login
                </Link>
                <Link
                    to="/register"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Home;
