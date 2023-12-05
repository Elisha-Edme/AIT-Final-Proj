import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AddPurchase from './pages/AddPurchase';
import Login from './pages/Login';
// import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addPurchase' element={<AddPurchase />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;