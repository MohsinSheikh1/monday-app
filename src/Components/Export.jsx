import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

const Export = ({ monday, context }) => {
  const [includeUpdates, setIncludeUpdates] = useState(false);
  const [includeSubItems, setIncludeSubItems] = useState(false);
  // const [sendCopyToEmail, setSendCopyToEmail] = useState(false);

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

  const getPDF = async () => {
    const updates = includeSubItems ? "true" : "false";
    const subitems = includeSubItems ? "true" : "false";

    const url = `https://pdf-monday.onrender.com/api/pdf?includeSubitems=${subitems}&includeUpdates=${updates}`;
    try {
      await axios
        .post(url, context, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          responseType: "blob" // set the response type to blob
        })
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "export.pdf"); // download the file
        });
    } catch (error) {
      console.log(error);
    }
  };
  const wholeBoard = async () => {
    const updates = includeSubItems ? "true" : "false";
    const subitems = includeSubItems ? "true" : "false";

    const url = `https://pdf-monday.onrender.com/api/pdf?includeSubitems=${subitems}&includeUpdates=${updates}&wholeBoard=true`;
    try {
      await axios
        .post(url, context, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          responseType: "blob" // set the response type to blob
        })
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "export.pdf"); // download the file
        });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-start justify-between h-full w-full p-[10%]">
        <h1 className="font-bold text-4xl text-white">Export to PDF</h1>
        <div>
          {/* checkboxes */}
          <div className="flex flex-col items-center justify-start gap-4 py-12">
            <div className="flex items-center justify-start gap-4 w-full">
              <input
                type="checkbox"
                id="include-updates"
                name="include-updates"
                checked={includeUpdates}
                onChange={() => setIncludeUpdates(!includeUpdates)}
              />
              <label htmlFor="include-updates" className="text-white">
                Include Updates
              </label>
            </div>
            <div className="flex items-center justify-start gap-4 w-full">
              <input
                type="checkbox"
                id="include-subitems"
                name="include-subitems"
                checked={includeSubItems}
                onChange={() => setIncludeSubItems(!includeSubItems)}
              />
              <label htmlFor="include-subitems" className="text-white">
                Include Subitems
              </label>
            </div>
            {/* <div className="flex items-center justify-start gap-4 w-full">
              <input
                type="checkbox"
                id="send-copy-to-email"
                name="send-copy-to-email"
                checked={sendCopyToEmail}
                onChange={() => setSendCopyToEmail(!sendCopyToEmail)}
              />
              <label htmlFor="send-copy-to-email" className="text-white">
                Send Copy to Email
              </label>
            </div> */}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 w-full">
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
            onClick={() => {
              getPDF();
            }}
          >
            Export Selected
          </button>
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
            onClick={() => {
              wholeBoard();
            }}
          >
            Export Whole Board
          </button>
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
            onClick={() => navigate("/schedule")}
          >
            Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default Export;
