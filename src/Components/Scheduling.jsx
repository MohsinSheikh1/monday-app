/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Scheduling = ({ monday, context }) => {
  const [inputDate, setInputDate] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (context?.user.isViewOnly) {
      navigate("/viewer");
    } else {
      return;
    }
  }, [context]);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
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
    setLoading(true);
    const date = new Date(inputDate);

    await axios
      .post(
        `https://pdfxport-k84zo.ondigitalocean.app/api/pdf/schedule?includeUpdates=${location.state.updates}`,
        // `https://pdfxport-k84zo.ondigitalocean.app/api/pdf/schedule?includeSubitems=${location.state.subitems}&includeUpdates=${location.state.updates}`,
        {
          context: location.state.context,
          time: date.getTime(),
          email: email
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.error === "Invalid Authentication") {
          const token = monday.get("sessionToken").then((data) => {
            axios
              .post(
                `https://pdfxport-k84zo.ondigitalocean.app/api/accountSlug`,
                { token: token }
              )
              .then((data) => {
                window.location.href = `https://auth.monday.com/oauth2/authorize?client_id=5856e829a851e4cc75bf0b80780176e8&redirect_uri=https://xportpdfmonday.netlify.app/&subdomain=${data.data.accountSlug}`;
                return;
              });
          });
        }
        toast.success("Scheduled", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setEmail("");
        setInputDate("");
      });
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
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

    setLoading(true);
    const date = new Date(inputDate);

    await axios
      .post(
        `https://pdfxport-k84zo.ondigitalocean.app/api/pdf/schedule?includeUpdates=${location.state.updates}&wholeBoard=true`,
        // `https://pdfxport-k84zo.ondigitalocean.app/api/pdf/schedule?includeSubitems=${location.state.subitems}&includeUpdates=${location.state.updates}&wholeBoard=true`,
        {
          context: location.state.context,
          time: date.getTime(),
          email: email
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.error === "Invalid Authentication") {
          const token = monday.get("sessionToken").then((data) => {
            axios
              .post(
                `https://pdfxport-k84zo.ondigitalocean.app/api/accountSlug`,
                { token: token }
              )
              .then((data) => {
                window.location.href = `https://auth.monday.com/oauth2/authorize?client_id=5856e829a851e4cc75bf0b80780176e8&redirect_uri=https://xportpdfmonday.netlify.app/&subdomain=${data.data.accountSlug}`;
                return;
              });
          });
        }
        toast.success("Scheduled", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setEmail("");
        setInputDate("");
      });
  };
  return (
    <div className="flex flex-col items-center justify-start w-full h-screen gap-8 p-[10%] overflow-hidden">
      {loading && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 p-[10%] overflow-hidden">
          <h1 className="text-white font-bold text-4xl">Scheduling...</h1>
        </div>
      )}
      {!loading && (
        <>
          <div className="flex flex-row items-start justify-start w-full gap-2">
            <h1 className="text-white font-bold text-2xl">
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
              onClick={() => navigate("/export")}
              className="text-white px-4 py-2 bg-blue-500 rounded-lg"
            >
              Back
            </button>
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
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Scheduling;
