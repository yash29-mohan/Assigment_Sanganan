import './App.css';
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState([]);
  
    useEffect(() => {
      axios
        .get(`http://3.19.185.123:8082/getBookingDetails/63ce109cdf0f9f1aaf137bb3`)
        .then((response) => {
          setData(response.data);
          console.log(response.data.Booking, "result");
        });
    }, []);  
  // let userData = data.Appointment[0];
  //   console.log(userData);

  const getMessage = (userData) => {
    if(userData.hasOwnProperty("slotStatus")) {
      let status = userData?.slotStatus?.status;
      return userData.baddress.messages[status];
    } else {
      return userData.baddress.messages.NOTSTARTED;
    }
  }

  const refresh = () => {
    window.location.reload();
  }


  return (
    <div>
      <header className="heading text-center">Details</header>
    <div className="container mb-5">
      {data &&
      data.Booking?.map((userData, index) => {
      return (
        <div key={index}>
          <div>
            <div className="d-flex justify-content-center">
              <img
                src={userData.baddress.logo}
                alt="Logo of Alliance Dental Center"
                className="alliance-logo"
              />
            </div>
            <p className="appointment text-center">
                  Appointment for: <br />
                  <b>{userData.baddress.name}</b>
                </p>

                <p className="user_name text-center">
                  Name : <b>{userData.cName}</b>
                </p>
                <p className="phone_status text-center">
                  Phone Number : <br /> <b>{userData.cPhoneNumber}</b>
                </p>
                <p className="phone_status text-center">
                  Status : <b style={{ color: "#08BEBC" }}>{userData.status}</b>
                </p>
                
                <p className="your_number text-center">
                  Your Number : {userData.queueNo}
                </p>
                {userData.reason && userData.reason !== "" ? <p className="text-center">
                  Reason : {userData.reason}
                </p> :  null}
                <h2 className="date_slot text-center">
                  Date & Slot : <br />{" "}
                  <b>
                    {userData.date} & {userData.slotName}
                  </b>
                </h2>
                <div
                  className="message-gueue py-3"
                  style={{ background: "#F4F4F4", height: "fit-content" }}
                >
                  <p className="message text-center m-0">
                    {getMessage(userData)}
                  </p>
                 {userData?.slotStatus?.currentQueueNo ?
                  <p className="progress text-center">
                    Current in Progress : {userData?.slotStatus?.currentQueueNo}{" "}
                  </p> : null}

                  <p className="refresh text-center" onClick={() => refresh()}>
                    Tap here to refresh status
                  </p> 
                </div>
                <p className="address text-center">
                  Venue Address : <br />
                  <b>
                    {userData.baddress.address1} {userData.baddress.address2}{" "}
                    {userData.baddress.pincode} {userData.baddress.state}
                  </b>{" "}
                </p>

                <a href={`https://www.google.com/maps/dir/?api=1&destination=${userData.baddress.loc.coordinates[0]},${userData.baddress.loc.coordinates[1]}`}>
                  <p className="map text-center">Get Directions on Map</p>
                </a>
                <p className="cancel text-center" onClick={() => refresh()}>
                  Tap here to cancel Appointment
                </p>
                <p className="assistance text-center">
                  for assistance call at : <br />{" "}
                  {userData.baddress.phoneNumber}
                </p>
          </div>
        </div>
      )
      }
      )}
      </div></div>
  );
}

export default App;
