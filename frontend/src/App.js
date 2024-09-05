import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import LoginRegister from './LoginRegister'
import AfterRegister from './AfterRegister'
import LoginOptions from './LoginOptions'
import AdminLogin from './AdminLogin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path="/options" element={<LoginOptions />}></Route>
      <Route path='/register' element={<LoginRegister/>}></Route>
      <Route path='/afterregister' element={<AfterRegister/>}></Route>
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
    </BrowserRouter>
     
  );
}

export default App;





