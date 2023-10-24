/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = ({ context }) => {
  const navigate = useNavigate();

  const apiKey = async (queryParameters, userId) => {
    try {
      const code = queryParameters.get("code");
      await axios
        .post("https://pdf-monday.onrender.com/api/user", {
          code: code,
          id: userId,
        })
        .then(() => {
          navigate("/export");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async (userId) => {
    try {
      await axios
        .get(`https://pdf-monday.onrender.com/api/user/${userId}`)
        .then((res) => {
          const hasKey = res.data.hasKey;
          if (!hasKey) {
            window.location.href =
              "https://auth.monday.com/oauth2/authorize?client_id=b431b5018a17b469ddb1066cdf41d543?redirect_uri=https://xportpdfmonday.netlify.app/";
          } else {
            navigate("/export");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (context) {
      const queryParameters = new URLSearchParams(window.location.search);
      const userId = context.user.id;
      const getUser = async (queryParameters) => {
        if (queryParameters.get("code")) {
          apiKey(queryParameters, userId);
        } else {
          checkUser(userId);
        }
      };
      getUser(queryParameters);
    }
  }, [context]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-20 h-20 border-4 border-white rounded-full animate-spin" />
      <p className="text-white text-base font-bold mt-4">Loading...</p>
    </div>
  );
};

export default Loading;
