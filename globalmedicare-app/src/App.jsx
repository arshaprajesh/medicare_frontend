
import './App.css'
import React from 'react';
import  LoginPatient from './components/patient';
import DoctorRegistration from './components/doctor';
import MakeAppointment from './components/payment';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  

return (
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginPatient />} />
      <Route path="/home" element={<DoctorRegistration />} />
      <Route path="/payment" element={<MakeAppointment />} />
      

  
   </Routes>
  </BrowserRouter>
  );
}

export default App
  