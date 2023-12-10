/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

const Export = ({ monday, context }) => {
  const [includeUpdates, setIncludeUpdates] = useState(false);
  const [includeSubItems, setIncludeSubItems] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!context) {
      navigate("/");
    } else {
      return;
    }
  }, [context]);

  const getPDF = async () => {
    setLoading(true);
    const updates = includeSubItems ? "true" : "false";
    const subitems = includeSubItems ? "true" : "false";

    const url = `https://pdfxport-k84zo.ondigitalocean.app/api/pdf?includeSubitems=${subitems}&includeUpdates=${updates}`;
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
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "export.pdf"); // download the file
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const wholeBoard = async () => {
    setLoading(true);
    const updates = includeSubItems ? "true" : "false";
    const subitems = includeSubItems ? "true" : "false";

    const url = `https://pdfxport-k84zo.ondigitalocean.app/api/pdf?includeSubitems=${subitems}&includeUpdates=${updates}&wholeBoard=true`;
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
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "export.pdf"); // download the file
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-start justify-between h-full w-full p-[10%]">
        {loading && (
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 p-[10%] overflow-hidden">
            <h1 className="text-white font-bold text-4xl">Downloading...</h1>
          </div>
        )}
        {!loading && (
          <>
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
                    onChange={() =>
                      setIncludeUpdates((prevValue) => !prevValue)
                    }
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
                    onChange={() =>
                      setIncludeSubItems((prevValue) => !prevValue)
                    }
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
                Export Group
              </button>
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
                onClick={() => {
                  wholeBoard();
                }}
              >
                Export Board
              </button>
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
                onClick={() =>
                  navigate("/schedule", {
                    state: {
                      subitems: includeSubItems,
                      updates: includeUpdates,
                      context: context
                    }
                  })
                }
              >
                Schedule Export
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Export;
