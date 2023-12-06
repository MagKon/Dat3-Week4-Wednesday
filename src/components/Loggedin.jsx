import React, { useState, useEffect } from "react";
import facade from "../apiFacade";

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await facade.fetchData().catch((err) => {
          if (err.status === 401) {
            alert("You are not logged in");
            window.location.href = "/login";
          } else {
            console.log("ERROR: " + err);
            alert("Something went badly wrong on the server!");
            window.location.href = "/";
          }
        });
        setDataFromServer(data.toString());
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

export default LoggedIn;
