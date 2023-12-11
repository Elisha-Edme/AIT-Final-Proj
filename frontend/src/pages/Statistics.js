import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import './Statistics.css';
import { Link } from 'react-router-dom';


const statsCompile = (data) => {
    const retailers = {};
    const categories = {};
    const methods = {};
    const dates = {};
    const costs = [];
    data.forEach((purch) => {
        const { Retailer, Category, PaymentMethod, BoughtTime, Cost } = purch;

        retailers[Retailer] = (retailers[Retailer] || 0) + 1;
        categories[Category] = (categories[Category] || 0) + 1;
        dates[BoughtTime.slice(0, 10)] = (dates[BoughtTime.slice(0,10)] || 0) + 1;
        methods[PaymentMethod] = (methods[PaymentMethod] || 0) + 1;
        costs.push(Cost);
    });
    return [retailers, categories, methods, dates, costs];
};
const statsReduce = (data) => {
    const findMost = (obj) => {
        let maxi = 0;
        let item = undefined;
        for (const key in obj) {
            if (obj[key] > maxi) {
                item = key;
                maxi = obj[key];
            }
        }
        return item;
    }
    const compiled = statsCompile(data);
    const sum = compiled.pop().reduce((item, acc) => acc += item, 0);
    const mostFreq = compiled.map(obj => {
        return findMost(obj);
    }); 
    return {"Retailer":mostFreq[0], "Category":mostFreq[1], "Payment Method":mostFreq[2], "Date":mostFreq[3], "Cost":data.length ? sum/data.length:0};
};
class Graphic {
    constructor(data){
        this.data = data;
        const [Retailer, Category, methods, BoughtTime, Cost]  = statsCompile(data)
        this.compiled = {Retailer, Category, "PaymentMethod": methods, BoughtTime, Cost}
    }

    makeFreqGraph(criteria){
        if(!this.compiled)
            return <p></p>
        console.log('compiled', this.compiled);
        const keys = Object.keys(this.compiled[criteria]);
        console.log('keys', keys);
        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: `Purchase ${criteria} Frequency`,
              },
            },
          };
        const data={
            labels: keys,
            datasets: [{
                    label:"Graph",
                    data: keys.map(item => this.compiled[criteria][item])
            }]
        };
        return <Bar options={options} data={data}/>;
    }

    makeGraph(criteria) {
        console.log(this.compiled);
        const keys = Object.keys(this.compiled[criteria]);
        return (
        <Plot
        data={[
          {type: 'bar', x: keys, y: keys.map(item => this.compiled[criteria][item])},
        ]}
        layout={{ title: `Purchase ${criteria} Frequency`}}
      />);
    }
}

const Statistics = () => {
    const [purchases, setPurchases] = useState([]);
    const [graphic, setGraphic] = useState(new Graphic(purchases));
    const [stats, setStats] = useState({
                                            "Retailer":"N/A",
                                            "Category":"N/A",
                                            "Payment Method":"N/A",
                                            "Date":"N/A",
                                            "Cost":"N/A",
                                        });
    const navigate = useNavigate();
    const {_id} = useParams();
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
    useEffect(() => {
        setStats(statsReduce(purchases));
        setGraphic(new Graphic(purchases));
    }, [purchases]);

    return (
        <div>
            <h2 className='heading'>Here are some stats for you</h2>
            <Link to={`/${_id}`}>Come Home Bitch</Link>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The most common Retailer you bough from was</td>
                        <td>{stats["Retailer"]}</td>
                    </tr>
                    <tr>
                        <td>The most common Date you bought on was</td>
                        <td>{stats["Date"]}</td>
                    </tr>
                    <tr>
                        <td>Your most common Category was</td>
                        <td>{stats["Category"]}</td>
                    </tr>
                    <tr>
                        <td>Your most common payment method was</td>
                        <td>{stats["Payment Method"]}</td>
                    </tr>
                    <tr>
                        <td>The average cost of your purchases was</td>
                        <td>{stats["Cost"]}</td>
                    </tr>
                </tbody>
            </table>
            {/* <p>{JSON.stringify(graphic.compiled)}</p> */}
            {/* <div id='Retailer'>{graphic.makeFreqGraph("Retailer")}</div> */}
            <div id='Retailer' className='graph'>{graphic.makeGraph("Retailer")}</div>
            <div id='Category' className='graph'>{graphic.makeGraph("Category")}</div>
            <div id='BoughtTime' className='graph'>{graphic.makeGraph("BoughtTime")}</div>
            {/* <div id='Category'></div>
            <div id='Date'></div> */}
        </div>
    )
}

export default Statistics;