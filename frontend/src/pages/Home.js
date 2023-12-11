import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: '#3498db' }}>Welcome to The Finance Tracker</h2>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                <Link
                    to="/login"
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                        padding: '10px 15px',
                        backgroundColor: '#3498db',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    style={{
                        display: 'block',
                        padding: '10px 15px',
                        backgroundColor: '#3498db',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Home;
