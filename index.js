import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let mail = "";
let password = ""; 
let Res_emails = [];
let Res_names = [];
let subject = "";
let mail_body = "";

function sendCustomEmail(toEmail, subject, body) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for 465, false for 587 (TLS)
    auth: {
      user: mail, // The sender's email address
      pass: password, // App password from Gmail
    },
  });

  // Email options
  let mailOptions = {
    from: mail, // Sender's email address
    to: toEmail, // Recipient's email address
    subject: subject, // Email subject
    text: body, // Email body (plain text)
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`Error: ${error}`);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
}

function secondPage(req, res, next) {
  subject = req.body["subject"];
  mail_body = req.body["body"];
  next();
}

function listOfNames(name, names) {
  const nameArray = name.split(/[\s,]+/).filter(Boolean);
  names.push(...nameArray);
}

function printNames(names) {
  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
}

function nextPage(req, res, next) {
  const Res_email = req.body["Res_emails"];
  const Res_name = req.body["Res_names"];
  listOfNames(Res_email, Res_emails);
  listOfNames(Res_name, Res_names);
  next();
}

function fun(req, res, next) {
  mail = req.body["email"];
  password = req.body["password"]; 
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/next", fun, (req, res) => {
  if (mail === "" || mail === " ") {
    return res.sendFile(__dirname + "/public/index.html");
  }
  return res.sendFile(__dirname + "/public/mails.html");
});

app.post("/firstPage", nextPage, (req, res) => {
  printNames(Res_emails);
  printNames(Res_names);
  return res.sendFile(__dirname + "/public/sending.html");
});

app.post("/secondPage", secondPage, (req, res) => {
    if(Res_emails.length === Res_names.length){
        for (let i=0;i<Res_emails.length;i++) {
            var personal_body = mail_body.replace("[NAME]",Res_names[i]);
            sendCustomEmail(Res_emails[i], subject, personal_body); 
        }
        res.send("Emails have been sent!");
    }else{
        for (let i=0;i<Res_emails.length;i++) {
            //var personal_body = mail_body.replace("[NAME]",Res_names[i]);
            sendCustomEmail(Res_emails[i], subject, mail_body); 
        }
        res.send("Emails have been sent!");
    }
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
