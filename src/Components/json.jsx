import React from "react";

const JSON = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full my-8 mx-4">
      <p className="text-base w-full text-left font-medium text-white">{"{"}</p>
      <p className="text-base w-full text-left font-medium text-white ml-2">
        {"apps : ["}
      </p>
      <p className="text-base w-full text-left font-medium text-white ml-4">
        {"{"}
      </p>
      <p className="text-base w-full text-left font-medium text-white ml-6">
        {"clientID: 5856e829a851e4cc75bf0b80780176e8"}
      </p>
      <p className="text-base w-full text-left font-medium text-white ml-4">
        {"}"}
      </p>
      <p className="text-base w-full text-left font-medium text-white ml-2">
        {"]"}
      </p>
      <p className="text-base w-full text-left font-medium text-white">{"}"}</p>
    </div>
  );
};

export default JSON;
