import React from "react";

import axios from "axios";

import { Checkbox } from "monday-ui-react-core";

const Export = ({ monday }) => {
  return (
    <div className="flex flex-col items-start justify-between h-[50%] w-[50%]">
      <h1 className="font-bold text-4xl text-white">Export to PDF</h1>

      <div>
        <Checkbox CheckboxClassName="text-white" label="Include Updates" />
        <Checkbox CheckboxClassName="text-white" label="Include SubItems" />
        <Checkbox
          labelClassName="primary-text-color"
          label="Send a copy to my email"
        />
      </div>

      <button
        className="bg-blue-500 px-4 py-2 rounded-lg hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border"
        onClick={async () => {
          await axios
            .post("https://api.monday.com/v2", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI4MTk4Mjg4NywiYWFpIjoxMSwidWlkIjo0ODU5NTMzMiwiaWFkIjoiMjAyMy0wOS0xNFQyMTo0MDo0MS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTg3MTUzNzYsInJnbiI6ImV1YzEifQ.pmVheIJ_ordb6DX7Zzj3_5ztoe7tWM3dMax0nmo-DTM",
                "API-Version": "2023-04"
              },
              body: JSON.stringify({
                query: "query { boards { columns {id title type} }}"
              })
            })
            .then((res) => console.log(res));
        }}
      >
        Export
      </button>
    </div>
  );
};

export default Export;
