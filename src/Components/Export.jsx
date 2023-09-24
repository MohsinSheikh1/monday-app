import { useEffect, useState } from "react";
import { Checkbox } from "monday-ui-react-core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Export = ({ monday, context }) => {
  const [pdfTable, setPdfTable] = useState("");
  const [data, setData] = useState("");
  const [includeUpdates, setIncludeUpdates] = useState(false);
  const [includeSubItems, setIncludeSubItems] = useState(false);
  const [sendCopyToEmail, setSendCopyToEmail] = useState(false);

  useEffect(() => {
    const parseDataForTable = (items) => {
      // Implement your logic to parse data based on checkboxes
      // Return the HTML table rows accordingly
      // You can use the data state variable for this
      const tableRow = `<tr>
        <td>Item Name</td>
        <td>Person</td>
        <td>Status</td>
        <td>Date</td>
      </tr>`;

      return tableRow;
    };

    const generatePDF = (newData) => {
      // Create a new jsPDF instance
      const tableData = JSON.parse(newData);
      console.log(newData);

      // Convert table data to HTML based on checkboxes
      const tableHtml = `<table>
        <thead>
          <tr>  
            <th>Name</th>
            <th>Person</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${parseDataForTable(tableData[0].groups.items)}
        </tbody>
      </table>`;

      setPdfTable(tableHtml);
    };

    if (data) {
      generatePDF(data);
    }
  }, [data]);

  useEffect(() => {
    const doc = new jsPDF();
    // Use html2canvas to convert the table to an image
    // console.log(document.querySelector("#pdfTable").innerHTML);
    html2canvas(document.querySelector("#pdfTable")).then((canvas) => {
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      console.log(imgData);
      doc.addImage(imgData, "PNG", 10, 10, 180, 0);
      doc.save("table.pdf");
    });
  }, [pdfTable]);

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
          onClick={() => {
            monday
              .api(
                `query {
                boards(ids: [${context.boardId}]) {
                  name
                  groups(ids: ["${context.groupId}"]) {
                    items {
                      id
                      name
                      column_values {
                        value
                        type
                        id
                      }
                    }
                  }
                }
              }`,
                {
                  token:
                    "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI4MTk4Mjg4NywiYWFpIjoxMSwidWlkIjo0ODU5NTMzMiwiaWFkIjoiMjAyMy0wOS0xNFQyMTo0MDo0MS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTg3MTUzNzYsInJnbiI6ImV1YzEifQ.pmVheIJ_ordb6DX7Zzj3_5ztoe7tWM3dMax0nmo-DTM",
                }
              )
              .then((res) => {
                console.log(context);
                setData(JSON.stringify(res.data.boards));
              })
              .catch((error) => {
                console.error("API call error:", error);
                // Handle error here
              });
          }}
        >
          Export
        </button>
        <div
          id="pdfTable"
          dangerouslySetInnerHTML={{ __html: pdfTable }}
          // style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default Export;
