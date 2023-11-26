/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = ({ context, monday }) => {
  const navigate = useNavigate();

  const apiKey = async (queryParameters, userId) => {
    try {
      const code = queryParameters.get("code");

      const account_id = context.account.id;

      await axios
        .post("https://pdfxport-k84zo.ondigitalocean.app/api/user", {
          code: code,
          id: userId,
          account_id: account_id,
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
      const token = await monday.get("sessionToken");
      console.log("Token: " + JSON.stringify(token));

      const account_id = context.account.id;

      await axios
        .get(
          `https://pdfxport-k84zo.ondigitalocean.app/api/user?user_id=${userId}&account_id=${account_id}`
        )
        .then((res) => {
          const hasKey = res.data.hasKey;
          if (!hasKey) {
            console.log("Doesnot have key");
            axios
              .post(
                `https://pdfxport-k84zo.ondigitalocean.app/api/accountSlug`,
                { token: token.data }
              )
              .then((data) => {
                console.log(data);
                window.location.href = `https://auth.monday.com/oauth2/authorize?client_id=b431b5018a17b469ddb1066cdf41d543&subdomain=${data.accountSlug}&redirect_uri=https://xportpdfmonday.netlify.app/`;
              });
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
