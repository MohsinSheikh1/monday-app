import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Scheduling = () => {
  const [inputDate, setInputDate] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();

  const handleConversion = async () => {
    const currentDate = new Date();
    if (!inputDate || email === "" || inputDate <= currentDate) {
      toast.error("Please enter a valid date and email", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }
    const date = new Date(inputDate);

    console.log(date.getTime());

    await axios
      .post(
        `https://oyster-app-636br.ondigitalocean.app/api/pdf/schedule?includeSubitems=${location.state.subitems}&includeUpdates=${location.state.updates}`,
        {
          context: location.state.context,
          date: date.getTime(),
          email: email
        }
      )
      .then(() =>
        toast.success("Scheduled", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        })
      );
  };
  const scheduleBoard = async () => {
    const currentDate = new Date();
    if (!inputDate || email === "" || inputDate <= currentDate) {
      toast.error("Please enter a valid date and email", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }
    const date = new Date(inputDate);

    await axios
      .post(
        `https://oyster-app-636br.ondigitalocean.app/api/pdf/schedule?includeSubitems=${location.state.subitems}&includeUpdates=${location.state.updates}&wholeBoard=true`,
        {
          context: location.state.context,
          date: date.getTime(),
          email: email
        }
      )
      .then(() =>
        toast.success("Scheduled", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        })
      );
  };
  return (
    <div className="flex flex-col items-center justify-start w-full h-screen gap-8 p-[10%] overflow-hidden">
      <div className="flex flex-col items-center justify-start w-full gap-2">
        <h1 className="text-white font-bold text-4xl">
          Schedule the PDF Export for Later
        </h1>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-2">
        <p className="text-white">
          Select a date and time to schedule the export.
        </p>
        <input
          type="datetime-local"
          value={inputDate}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const currentDate = new Date();

            if (selectedDate <= currentDate) {
              // Prevent selecting a past or current date/time
              setInputDate(currentDate.toISOString().split("T")[0]);
            } else {
              setInputDate(e.target.value);
            }
          }}
          min={new Date().toISOString().split("T")[0]}
          className="bg-white rounded-lg w-[80%] max-w-[400px] px-4 py-2 focus:outline-0"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an email for PDF to be sent"
          className="bg-white rounded-lg w-[80%] max-w-[400px] px-4 py-2 focus:outline-0"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          onClick={handleConversion}
          className="text-white px-4 py-2 bg-blue-500 rounded-lg"
        >
          Schedule
        </button>
        <button
          onClick={scheduleBoard}
          className="text-white px-4 py-2 bg-blue-500 rounded-lg"
        >
          Schedule Board
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Scheduling;
