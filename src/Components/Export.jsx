import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "monday-ui-react-core";
import axios from "axios";

const Export = ({ monday, context }) => {
  const [includeUpdates, setIncludeUpdates] = useState(false);
  const [includeSubItems, setIncludeSubItems] = useState(false);
  const [sendCopyToEmail, setSendCopyToEmail] = useState(false);

  // useEffect(() => {
  //   const oAuth = async () => {
  //     console.log("hello");
  //     const url =
  //       "https://auth.monday.com/oauth2/authorize?client_id=b431b5018a17b469ddb1066cdf41d543";
  //     const response = await axios.get(url);
  //     console.log(response);
  //   };
  //   oAuth();
  // }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-start justify-between h-[50%] w-[50%]">
        <h1 className="font-bold text-4xl text-white">Export to PDF</h1>
        <div>
          <Checkbox
            CheckboxClassName="text-white"
            label="Include Updates"
            onChange={() => setIncludeUpdates(!includeUpdates)}
          />
          <Checkbox
            CheckboxClassName="text-white"
            label="Include SubItems"
            onChange={() => setIncludeSubItems(!includeSubItems)}
          />
          <Checkbox
            labelClassName="primary-text-color"
            label="Send a copy to my email"
            onChange={() => setSendCopyToEmail(!sendCopyToEmail)}
          />
        </div>

        <button
          className="bg-blue-500 px-4 py-2 rounded-lg hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
          onClick={() => {}}
        >
          Export
        </button>
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
          onClick={() => navigate("/schedule")}
        >
          Schedule
        </button>
      </div>
    </>
  );
};

export default Export;
