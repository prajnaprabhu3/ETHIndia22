import React from "react";
import Header from "../components/Header";
import "../styles/ShowAlert.scss";

import { useState, useEffect } from "react";

const ShowAlert = () => {
  const [alerts, setAlerts] = useState([]);
  fetch("http://172.105.42.117/alert")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data);
      setAlerts(data.data);
    });

  // const data = [
  //   {
  //     alertName: "someName",
  //     alertAddress: "smartContractAddress",
  //     alertSlackWebhook: "https://hooks.slack.com",
  //   },
  // ];

  return (
    <div>
      <Header />

      <div className="alerts-show-wrapper flex flex-col justify-between  w-8xl mx-auto">
        <p className="text-5xl font-semibold">Alerts</p>

        <div className="flex flex-col justify-between alerts-container-wrapper">
          {alerts.map((user) => (
            <div className="flex flex-col mt-4 justify-around items-left py-4 px-10 alerts-container rounded-lg">
              <p className="text-lg font-semibold">
                Alert name:
                <span className="text-base font-medium"> {user.alertName}</span>
              </p>
              <p className="text-lg font-semibold">
                Smart contract adress:
                <span className="text-base font-medium">
                  {user.alertAddress}
                </span>
              </p>
              <p className="text-lg font-semibold">
                Web hook:
                <span className="text-base font-medium">
                  {user.alertSlackWebhook}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAlert;
