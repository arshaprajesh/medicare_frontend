import React, { useEffect, useState } from 'react';


import { useLocation } from "react-router-dom";




function MakeAppointment(){


debugger

     const locationState = useLocation();
     const [message, setMessage] = useState("");

     if (!locationState.state) {
         return <h2>Payment Page</h2>;
         }
     const { doctorId, doctorName, location, date } = locationState.state;;


useEffect(() => {
    setMessage(`Booked an appointment with ${doctorName} on ${date} at ${location} successfully!`);
    console.log("inside use effect:");
    }, []);
             console.log("make an  appointment successfully:");


    return(
        <div>
            <div>
                {message}
                </div>
            <h2>Payment Page</h2>
        </div>

        );
    }
export default MakeAppointment;