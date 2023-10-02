import React, { useState } from "react";

const Scheduling = () => {
  const [inputDate, setInputDate] = useState("");
  const [convertedDate, setConvertedDate] = useState("");

  const handleConversion = () => {
    const date = new Date(inputDate);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday

    const formattedDate = `${minutes} ${hours} ${month} ${dayOfMonth} ${dayOfWeek}`;
    setConvertedDate(formattedDate);
  };
  return (
    <div className="flex flex-col items-center justify-start w-full gap-8">
      <div className="flex flex-col items-center justify-start w-full gap-2">
        <h1 className="text-white font-bold text-4xl">
          Schedule the PDF Export for Later
        </h1>
        <p className="text-white text-base">
          You can schedule the PDF export to run at a later time.
        </p>
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
      </div>
      <button
        onClick={handleConversion}
        className="text-white px-4 py-2 bg-blue-400 rounded-lg"
      >
        Convert
      </button>
      <p className="text-white">{convertedDate}</p>
    </div>
  );
};

export default Scheduling;
