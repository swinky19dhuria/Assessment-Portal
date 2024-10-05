import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import LoginRegister from './LoginRegister'
import TaskDashboard from './TaskDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<LoginRegister/>}></Route>
      <Route path="/task-dashboard" element={<TaskDashboard />} />
    </Routes>
    </BrowserRouter>
     
  );
}

export default App;





