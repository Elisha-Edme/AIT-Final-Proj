// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Welcome = () => {
//     const [purchases, setPurchases] = useState([]);
//     const {uid} = useParams();
//     const navigate = useNavigate();
//     const getPurchases = async (_id) => {
//         //const api_url = `https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/user/${_id}`
//         const api_url = `http://localhost:8080/api/purchases/user/${uid}`
//         await axios.get(api_url)
//         .then(async response =>  {
//             if (response && response.status != 200) {
//                 console.log(response);
//                 navigate('/');
//             }
//             else {
//                 console.log("resp: ", response);
//                 const data = response.data;
//                 console.log("data: ", data);
//                 localStorage.setItem('name', data['name']);
//                 setPurchases(data['purchases'])
//             }
//         }).catch(console.log);
        
//     };
//     // useEffect(async () => { await getPurchases(uid).then(resp => {console.log(purchases);})},[]);
//     useEffect(() => {
//       const fetchData = async () => {
//         await getPurchases(uid);
//       };
//       fetchData();
//     }, []);
//     return (<div>
//       <h1>Welcome Lil Bro</h1>
//       <table>
        // <thead>
        //   <tr>
        //     <th>Retailer</th>
        //     <th>Bought Time</th>
        //     <th>Cost</th>
        //     <th>Method</th>
        //     <th>Category</th>
        //   </tr>
        // </thead>
        // <tbody>
        //   {purchases.map((purchase, index) => (
        //     <tr key={index}>
        //       <td>{purchase.retailer}</td>
        //       <td>{purchase.boughtTime}</td>
        //       <td>{purchase.cost}</td>
        //       <td>{purchase.method}</td>
        //       <td>{purchase.category}</td>
        //     </tr>
        //   ))}
        // </tbody>
//       </table>
//     </div>)
// };

// export default Welcome;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Welcome = () => {
  const [purchases, setPurchases] = useState([]);
  const { uid } = useParams();
  const navigate = useNavigate();
  
  useEffect( () => {
    //  getPurchases(uid).then(console.log('ps', purchases));
     getPurchases(uid);
  }, [uid, navigate]);
  const getPurchases = async (_id) => {
    try {
      const api_url = `https://finance-tracker-api-elisha-edmes-projects.vercel.app/api/purchases/user/${_id}`
      //const api_url = `http://localhost:8080/api/purchases/user/${uid}`
      const response = await axios.get(api_url);

      if (response.status !== 200) {
        console.log(response);
        navigate('/');
      } else {
        const data = response.data;
        console.log('data', data.purchases);
        localStorage.setItem('name', data['name']);
        setPurchases(data.purchases);
        console.log('purchases', purchases);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
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
          {
            purchases.map((purchase, index) => 
            {
              return(
                <tr key={index}>
                  <td>{purchase.retailer}</td>
                  <td>{purchase.boughtTime}</td>
                  <td>{purchase.cost}</td>
                  <td>{purchase.method}</td>
                  <td>{purchase.category}</td>
                </tr>
              );
            })
          }
        </tbody>
        </table>
    </div>
  );
};

export default Welcome;
