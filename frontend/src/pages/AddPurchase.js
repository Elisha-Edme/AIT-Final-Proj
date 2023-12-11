import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const formContainerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0',
    color: '#555',
    fontSize: '14px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
  };

const AddPurchase = () => {
  const [purchaseData, setPurchaseData] = useState({
    Retailer: '',
    BoughtTime: '',
    Cost: '',
    PaymentMethod: '',
    Category: '',
  });
  const {_id} = useParams();
  console.log(_id);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', purchaseData);
    
    // Add logic to send the data to your server or perform any necessary actions
    //const api_url = `http://localhost:8080/api/purchases/addPurchase/${_id}`;
    const api_url = `https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/addPurchase/${_id}`;
    const res = await axios.post(api_url, {...purchaseData});
    if (res.status === 200) {
        console.log(res);
        navigate(`/${_id}`);
    }
    else {
        alert("Invalid Purchase Data");
        for (const key in purchaseData) {
            purchaseData[key] = '';
        }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={headingStyle}>Add a Purchase</h3>
      <form>
        <label style={labelStyle}>Retailer</label>
        <input name="Retailer" type="text" style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Purchase Time</label>
        <input name="BoughtTime" type="date" style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Cost</label>
        <input name="Cost" type="text" style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Payment Method</label>
        <input name="PaymentMethod" type="text" style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Category</label>
        <input name="Category" type="text" style={inputStyle} onChange={handleChange} />

        <button type="submit" style={buttonStyle} onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPurchase;