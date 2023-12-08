import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
    const [purchases, setPurchases] = useState([]);
    const getPurchases = async (_id) => {
        const data = await axios.get(`https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/${_id}`);
        console.log(data.json());
    };
    const navigate = useNavigate();
    return <div><h1>WELCOME LIL BRO</h1></div>
};

export default Welcome;