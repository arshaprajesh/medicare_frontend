import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function DoctorRegistration(){
    const[type,setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [popup,setPopup] = useState("");
    const [findDoctor, setFindDoctor] = useState([]);
    const [appointment ,setAppointment] = useState([]);
    const navigate = useNavigate();


    

    // Load doctor types when page loads
    useEffect(() => {
        axios.get("http://localhost:8084/doctors/types")
        .then(res => {
            console.log("Types loaded:", res.data);
            setType(res.data)
    })
        .catch(err => console.error("Error loading types:", err));
    },[]);


    useEffect(() => {
        if (selectedType) {
            axios.get(`http://localhost:8084/doctors/type/${selectedType}`)
               .then(res => {
                console.log("Doctors:", res.data);
                setDoctors(res.data);
                })
                .catch(err => console.error(err));
        }
    }, [selectedType]);


    
    const toggleDoctorSelection = (doctorId) => {
        if (findDoctor.includes(doctorId)) {
            // remove doctor
            setFindDoctor(findDoctor.filter(id => id !== doctorId));
        } else {
            // add doctor
            setFindDoctor([...findDoctor, doctorId]);
        }
        };



   const handleRegister = async() => {
       if (findDoctor.length === 0) {
           alert("Please select at least one doctor.");
           return;
       }
const selectedDoc = doctors.find(d => findDoctor.includes(d.doctor_id));

const formattedDate = selectedDoc.date.split("T")[0];
console.log("Formatted date:", formattedDate);

try{

    const response = await axios.post('http://localhost:8084/appointment/appointmentDetails',null,
        {
            params:{
        doctorId: selectedDoc.doctor_id,
        patientId:1,
        location: selectedDoc.location,
        date: formattedDate

        }
        });

       const saved = response.data;
       console.log("Appointment saved:", saved);
       navigate("/payment", {
           state: {
               doctorId: selectedDoc.doctor_id,
               doctorName: selectedDoc.doctor_name,
               location: selectedDoc.location,
               date: selectedDoc.date
           }
       });
   }catch (err) {
       console.error("Error saving appointment:", err);
       alert("Failed to save appointment");
       }
       };


   
    
    return (
        <div style={{ padding: "20px" }}>
         <h2>Welcome to Global Medicare</h2>

         <label>Select Doctor Type:</label>
         <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>

           <option value="">-- Select type--</option>
            {type.map((t, index) => (
                <option key={index} value={t}>{t}</option>
                 ))}
          </select>
           <br /><br />
            {doctors.length > 0 && (
                 <div>
                    <h3>Doctors List</h3>
                     <table border="1" cellPadding="10">
                        <thead>

                             <tr>
                                <th>select</th>
                                <th>doctor Name</th>
                                <th>Date</th>
                                 <th>Location</th>
                                 <th>Fee</th>
                                 <th>ID</th>
                                
                             </tr>
                        </thead>
                        <tbody>
                            
                        {doctors.map((doc) => (
                            <tr
                            key={doc.doctor_id}
                             style={{
                                backgroundColor: findDoctor.includes(doc.doctor_id)
                                ? "#d1ffd1"
                                 : "white"
                                    }}
                                     >
                                         <td>
                                             <input
                                              type="checkbox"
                                               checked={findDoctor.includes(doc.doctor_id)}
                                               onChange={() => toggleDoctorSelection(doc.doctor_id)}
                                               />

                                         </td>
                                         
                                         <td>{doc.doctor_name}</td>
                                         <td>{doc.date}</td>
                                         <td>{doc.location}</td>
                                         <td>{doc.fee}</td>
                                         <td>{doc.doctor_id}</td>
                                         

                                     </tr>
                                     ))}
                     </tbody>
                      </table>
                      <br />

                      <button onClick={handleRegister} style={{ padding: "10px 20px", fontSize: "16px" }}>
                        Register
                      </button>


                     </div>
                    )}

                    {popup && (
                        <div style={{
                             marginTop: "20px",
                             padding: "10px",
                             backgroundColor: "#4CAF50",
                             color: "white",
                             width: "fit-content",
                             borderRadius: "5px"
                        }}>
                            {popup}
                        </div>
                    )}
         
        </div>

    );
}
export default DoctorRegistration;
