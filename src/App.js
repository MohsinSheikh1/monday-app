import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import Export from "./Components/Export";
import Scheduling from "./Components/Scheduling";
import axios from "axios";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  useEffect(() => {
    if (context);
    {
      const queryParameters = new URLSearchParams(window.location.search);
      const getUser = async (queryParameters) => {
        if (queryParameters.get("code")) {
          const code = queryParameters.get("code");
          console.log(code);
          // await axios
          //   .post("https://auth.monday.com/oauth2/token", {
          //     client_id: "b431b5018a17b469ddb1066cdf41d543",
          //     client_secret: "64e5a8100fe921cc381b7b20dd59c4a7",
          //     code: code,
          //     redirect_uri:
          //       "https://8893-2a09-bac5-5038-15f-00-23-417.ngrok-free.app/"
          //   })
          //   .then((res) => {
          //     console.log(res);
          //   });
        } else {
          const userId = context.user.id;
          await axios
            .get(`https://pdf-monday.onrender.com/api/user/${userId}`)
            .then((res) => {
              if (!res.hasKey) {
                window.location.href =
                  "https://auth.monday.com/oauth2/authorize?client_id=b431b5018a17b469ddb1066cdf41d543?redirect_uri=https://8893-2a09-bac5-5038-15f-00-23-417.ngrok-free.app/";
              }
            });
        }
      };
      getUser(queryParameters);
    }
  }, [context]);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#181B34]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Export monday={monday} context={context} />}
          />
          <Route
            path="/schedule"
            element={<Scheduling monday={monday} context={context} />}
          />
        </Routes>
        <p></p>
      </Router>
    </div>
  );
};

export default App;
