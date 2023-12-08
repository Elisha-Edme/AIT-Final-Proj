import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AddPurchase from './pages/AddPurchase';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
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
            <Route path='/:uid/addPurchase' element={<AddPurchase />} />
            {/* <Route path='/:uid' element={<Welcome />} /> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;