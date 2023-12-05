import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Sanitize input using mongo-sanitize
        const {name, password} = formData;

        // Submit the sanitized data to your backend for registration
        // Example: sendFormDataToServer({ username: sanitizedUsername, email: sanitizedEmail, password: sanitizedPassword });
        const api_url = 'https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/user/register';
        const postData = {name, password};
        const sendPostRequest = async () => {
            try {
                const response = await axios.post(api_url, postData);
                console.log('Response:', response.data);
                navigate('/');
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        // Clear the form after submission
        setFormData({
            name: '',
            password: '',
        });
        // Call the function
        sendPostRequest();
    };

    return (
        <div style={styles.container}>
            <h2>Registration</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: 'auto',
        marginTop: '50px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
};

export default Register;
