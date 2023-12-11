import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '20px',
};

const thStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px',
  textAlign: 'left',
  border: '1px solid #ddd',
};

const tdStyle = {
  padding: '8px',
  textAlign: 'left',
  border: '1px solid #ddd',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  marginTop: '20px',
  cursor: 'pointer',
  borderRadius: '5px',
};

const Welcome = () => {
  const [purchases, setPurchases] = useState([]);
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect( () => {
    const getPurchases = async () => {
      try {
        const api_url = `https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/user/${_id}`
        // const api_url = `http://localhost:8080/api/purchases/user/${_id}`
        const response = await axios.get(api_url);
  
        if (response.status !== 200) {
          console.log(response);
          navigate('/');
        } else {
          const data = response.data;
          const p = data.purchases;
          console.log('data', data.purchases);
          localStorage.setItem("name", data.name);
          console.log('p', p)
          setPurchases(p);
          console.log('purchases', purchases, p);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPurchases(_id);
  }, [navigate, _id]);

  const handleClick = () => {
    navigate(`/${_id}/addPurchase`);
  };
  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Retailer</th>
            <th style={thStyle}>Bought Time</th>
            <th style={thStyle}>Cost</th>
            <th style={thStyle}>Method</th>
            <th style={thStyle}>Category</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={index}>
              <td style={tdStyle}>{purchase.Retailer}</td>
              <td style={tdStyle}>{purchase.BoughtTime.slice(0, 10)}</td>
              <td style={tdStyle}>{purchase.Cost}</td>
              <td style={tdStyle}>{purchase.PaymentMethod}</td>
              <td style={tdStyle}>{purchase.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={buttonStyle} onClick={() => handleClick()}>
        Add New Purchase
      </button>
    </div>
  );
};
export default Welcome;