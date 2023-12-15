/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import Export from "./Components/Export";
import Scheduling from "./Components/Scheduling";
import Loading from "./Components/Loading";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermOfService from "./Components/TermOfService";
import Json from "./Components/json";
import axios from "axios";
import Viewer from "./Components/viewer";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();

  const sessionToken = async () => {
    monday.get("sessionToken").then(async (res) => {
      // if token is correct return and if not return 500 internal error
      if (res.data) {
        await axios
          .post(`https://pdfxport-k84zo.ondigitalocean.app/api/checkToken`, {
            token: res.data
          })
          .then((data) => {
            if (data.data.valid) {
              return;
            } else {
              throw new Error("Not Authorized");
            }
          })
          .catch((err) => {
            return;
          });
      }
    });
  };

  useEffect(() => {
    sessionToken();
  }, []);

  const mondayContext = async () => {
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    // monday.listen("context").then((res) => setContext(res.data));
    await monday.listen("context", (res) => {
      setContext(res.data);
    });
  };

  useEffect(() => {
    if (
      window.location.pathname === "/privacypolicy" ||
      window.location.pathname === "/termofservice"
    ) {
      return;
    } else {
      // Notice this method notifies the monday platform that user gains a first value in an app.
      // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
      mondayContext();
    }
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data

  return (
    <>
      <div
        className={`flex items-center justify-center ${
          window.location.pathname === "/privacypolicy" ||
          window.location.pathname === "/termofservice" ||
          window.location.pathname === "/monday-app-association.json"
            ? ""
            : "h-screen w-screen"
        }  bg-[#181B34]`}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Loading context={context} monday={monday} />}
            />
            <Route
              path="/export"
              element={<Export monday={monday} context={context} />}
            />
            <Route
              path="/schedule"
              element={<Scheduling monday={monday} context={context} />}
            />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termofservice" element={<TermOfService />} />
            <Route path="/viewer" element={<Viewer />} />
            <Route path="/monday-app-association.json" element={<Json />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
