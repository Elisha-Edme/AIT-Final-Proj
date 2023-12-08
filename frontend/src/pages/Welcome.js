import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Welcome = () => {
    const [purchases, setPurchases] = useState([]);
    const {uid} = useParams();
    const navigate = useNavigate();
    const getPurchases = async (_id) => {
        const data = await axios.get(`https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/user/${_id}`);
        if (data.status != 200) {
            console.log(data);
            navigate('/');
        }
        else {
            localStorage.setItem('name', data.name);
            const api_url = "https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/"
            setPurchases(data.purchases.map(async (pid)=> {
                const resp = await axios.get(`${api_url}${pid}`);
                return resp.json();
            }));
        }
    };
    useEffect(() => {getPurchases(uid);},[]);
    getPurchases(uid);
    return (<div>
        <h1>Welcome Lil Bro</h1>
        <table>
          <thead>
            <tr>
              <th>Retailer</th>
              <th>Bought Time</th>
              <th>Cost</th>
              <th>Method</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.retailer}</td>
                <td>{purchase.boughtTime}</td>
                <td>{purchase.cost}</td>
                <td>{purchase.method}</td>
                <td>{purchase.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
};

export default Welcome;