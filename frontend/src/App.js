import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AddPurchase from './pages/AddPurchase';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Statistics from './pages/Statistics';
// import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/:_id/addPurchase' element={<AddPurchase />} />
            <Route path='/:_id' element={<Welcome />} />
            <Route path='/statistics/:_id' element={<Statistics />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;