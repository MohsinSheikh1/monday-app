const express = require("express");
const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
const monday = require("monday-sdk-js")();
const nodemailer = require("nodemailer");
monday.setToken(
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI4MTk4Mjg4NywiYWFpIjoxMSwidWlkIjo0ODU5NTMzMiwiaWFkIjoiMjAyMy0wOS0xNFQyMTo0MDo0MS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTg3MTUzNzYsInJnbiI6ImV1YzEifQ.pmVheIJ_ordb6DX7Zzj3_5ztoe7tWM3dMax0nmo-DTM"
);
const app = express();

app.use(express.json());

async function getRequiredData(context) {
  let data = JSON.stringify(
    await monday.api(
      `query {
                boards (ids: [${context.boardId}]) {
                    name
                    columns {
                        title
                        id
                        settings_str
                      }
                    groups (ids: ["${context.groupId}"]) {
                        title
                        items {
                            id
                            name
                            column_values 
                            {
                                value
                                type
                                id
                                text
                            }
                        }
                    }
                }
            }`
    )
  );

  data = JSON.parse(data);
  data = data.data;
  console.log(data.boards[0].columns[3].settings_str);
  return data;
}

function generateHTML(data) {
  const html = `
        <html>
        <head>
            <style>
                h1, h2 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    text-align: center;
                }
                th {
                    background-color: #f2f2f2;
                    /*                    padding: .5rem;*/
                    font-weight: bold;
                    color: black;
                }

            </style>
        <body>
        ${data.boards
          .map((board, i) => {
            return `<h1>${board.name}</h1>
                ${board.groups
                  .map((group, j) => {
                    return `<h2>${group.title}</h2>
                  <table>
                    <tr>
                    ${board.columns
                      .map((column) => {
                        return `<th>
                        ${column.title}
                        </th>`;
                      })
                      .join("")}
                    </tr>
                    ${group.items
                      .map((item) => {
                        return `
                        <tr>
                            <td>${item.name}</td>
                            ${item.column_values
                              .map((column) => {
                                return `<td>${column.text}</td>`;
                              })
                              .join("")}
                        </tr>
                        `;
                      })
                      .join("")}`;
                  })
                  .join("")}`;
          })
          .join("")}
                  </body>
        </html>
    `;
  return html;
}

async function generatePDF(html) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html);

  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return pdf;
}

app.post("/api/pdf", async (req, res) => {
  const data = await getRequiredData(req.body);
  const html = generateHTML(data);
  const pdf = await generatePDF(html);
  res.contentType("application/pdf");
  res.send(pdf);
});

app.post("/api/pdf/schedule", async (req, res) => {
  const job = schedule.scheduleJob("12 16 26 9 2", async () => {
    const data = await getRequiredData(req.body);
    const html = generateHTML(data);
    const pdf = await generatePDF(html);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "sheikhmohsin181@gmail.com",
        pass: "ebmj lpyz ocbb wbwk"
      }
    });

    const mailOptions = {
      from: "",
      to: "faiqueahmadkhan@gmail.com",
      subject: "PDF",
      text: "PDF",
      attachments: [
        {
          filename: "PDF.pdf",
          content: pdf,
          contentType: "application/pdf"
        }
      ]
    };

    await transporter.sendMail(mailOptions);
  });

  job.on("scheduled", () => {
    console.log("Job scheduled");
    res.send("Job scheduled");
  });
});

module.exports = app;
