import Employee from "../../models/employee/basic.model";
import Employer from "../../models/employer/basic.model";
import { sendEmail } from "../utils/sendgridemail";
import jwt from "jsonwebtoken";
import config from "../../../config/config";

// create token for signin user
const createToken = (id) => {
  return jwt.sign({ _id: id }, config.jwtSecret);
};

// send employee the interest email from employer
const sendEmployeeEmail = async (req, res) => {
  let html =
    "<html>" +
    "<head><style>" +
    ".brand{width: 80%;margin:auto;margin-top: 100px;}" +
    ".container{max-width: 700px;margin: auto}" +
    ".userblue{color: rgb(47, 85, 151)}" +
    ".userdarkblue{color: rgb(0, 32, 96)}" +
    ".userred{color:rgb(148, 0, 0)}" +
    ".col-6{width: 50%;float: left;}" +
    ".col-6>p{font-weight: 600;}" +
    "html{font-family: Arial, Helvetica, sans-serif;}" +
    "p{margin-top: 20px;}" +
    "p.comment{margin-top: 70px;letter-spacing: 1px;line-height: 35px;}" +
    ".btn{width: 60%;min-height: 50px;text-align: center;margin: auto;color: white;border: solid 1px;border-radius: 5px;margin-left: 10%;}" +
    ".interest{background-color: rgb(0, 32, 96);}" +
    ".nointerest{background-color: rgb(148, 0, 0);}" +
    "</style></head>" +
    "<body>" +
    "<div class='container'>" +
    "<div style='width: 100%; text-align: center;'>" +
    "<img src='https://image.prntscr.com/image/lsYCEcRTTQG5tUAl25LQcg.png' class='brand' alt='mybrand' />" +
    "</div>" +
    "<h1 style='text-align:center'>" +
    "<i>" +
    "<span class='userblue'>HAS SOMEONE INTE</span>" +
    "<span class='userdarkblue'>RESTED</span>" +
    "<span class='userred'> IN YOU!!!</span>" +
    "</i>" +
    "</h1>" +
    "<div style='width: 100%; min-height:200px'>" +
    "<div class='col-6'>" +
    "<p>BUSINESS NAME:</p>" +
    "<p>BUSINESS ADDRESS:</p>" +
    "<p>OPEN POSITION:</p>" +
    "<p>MINIMUM YEARS OF EXPERIENCE:</p>" +
    "<p>STYLE OF SERVICE:</p>" +
    "<p>TIME OF DAY:</p>" +
    "</div>" +
    "<div class='col-6'>" +
    "<p>Perkins</p>" +
    "<p>1313 Buffalo Road Minepolis</p>" +
    "<p>Line cook</p>" +
    "<p>7 years</p>" +
    "<p>Casual</p>" +
    "<p>Dinner</p>" +
    "</div></div>" +
    "<p class='comment'>PLEASE LET US KNOW IF YOU WOULD LIKE TO BE CONDUCTED ABOUT THIS OPPORTUNITY</p>" +
    "<div>" +
    "<div class='col-6'>" +
    "<form action='http://localhost:8000/api/mail/employer/interest' method='post'>" +
    "<input name='employerID' style='display: none' value='" +
    req.body.id +
    "'/><input name='filterID' style='display: none' value='" +
    req.body.filterID +
    "'/>" +
    "<button type='submit' class='interest btn'>YES! CONTACT ME ABOUT THIS OPPORTUNITY</button>" +
    "</form></div>" +
    "<div class='col-6'>" +
    "<form action='http://localhost:8000/api/mail/employer/nointerest' method='post'>" +
    "<input name='employerID' style='display: none' value='" +
    req.body.id +
    "'/>" +
    "<input name='filterID' style='display: none' value='" +
    req.body.filterID +
    "'/>" +
    "<button type='submit' class='nointerest btn'>NO! I PASS ON THIS OPPORTUNITY</button>" +
    "</form></div></div></div></body></html>";
  let message = "none";
  let id = req.body.employeeID;
  try {
    let user = await Employee.findOne({ _id: id });
    if (!user) {
      return res.status(403).json({
        error: "there is no user with such id",
      });
    }
    let sendResult = await sendEmail({
      email: user.email,
      subject: "Someone is interested in You",
      message,
      html,
    });

    if (sendResult) {
      return res.status(200).json({
        status: "success",
        message: "your interest message was sent to employee",
      });
    } else {
      return res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    return res.status(500).json({
      error: "There was an error sending to the email. Try again later",
    });
  }
};

const commonhtml =
  "<html>" +
  "<head>" +
  "<style>" +
  ".brand{width: 80%;margin:auto;margin-top: 0px;}" +
  ".container{max-width: 700px;margin: auto}" +
  ".userblue{color: rgb(47, 85, 151)}" +
  ".userdarkblue{color: rgb(0, 32, 96)}" +
  ".userred{color:rgb(148, 0, 0)}" +
  ".col-6{width: 50%;float: left;}" +
  ".col-6>p{font-weight: 600;}" +
  "html{font-family: Arial, Helvetica, sans-serif;}" +
  "p{margin-top: 20px;}" +
  "p.comment{margin-top: 70px;letter-spacing: 1px;line-height: 35px;}" +
  ".btn{width: 60%;min-height: 50px;text-align: center;margin: auto;color: white;border: solid 1px;border-radius: 5px;margin-left: 10%;}" +
  ".interest{background-color: rgb(0, 32, 96);}" +
  ".nointerest{background-color: rgb(148, 0, 0);}" +
  "</style>" +
  "</head>" +
  "<body>" +
  "<div class='container'>" +
  "<div style='width: 100%; text-align: center; margin-top: 80px'>" +
  "<h1 style='text-align:center' class='userblue'><i>Your</i></h1>" +
  "<img src='https://image.prntscr.com/image/lsYCEcRTTQG5tUAl25LQcg.png' class='brand' alt='mybrand' />" +
  "</div>" +
  "<h1 style='text-align:center'><i><span class='userdarkblue'>Candidate C for:</span></i></h1>" +
  "<div style='width: 100%; min-height:200px'>" +
  "<div class='col-6'>" +
  "<p>BUSINESS NAME:</p>" +
  "<p>BUSINESS ADDRESS:</p>" +
  "<p>OPEN POSITION:</p>" +
  "<p>MINIMUM YEARS OF EXPERIENCE:</p>" +
  "<p>STYLE OF SERVICE:</p>" +
  "<p>TIME OF DAY:</p>" +
  "</div>" +
  "<div class='col-6'>" +
  "<p>Perkins</p>" +
  "<p>1313 Buffalo Road Minepolis</p>" +
  "<p>Line cook</p>" +
  "<p>7 years</p>" +
  "<p>Casual</p>" +
  "<p>Dinner</p>" +
  "</div>" +
  "</div>";

const sendEmployerEmail = async (suffhtml, req, res) => {
  let html = commonhtml + suffhtml;
  let message = "none";
  let id = req.body.id;
  console.log(req.body);
  try {
    let user = await Employer.findOne({ _id: id });
    if (!user) {
      return res.status(403).json({
        error: "there is no user with such id",
      });
    }
    let sendResult = await sendEmail({
      email: user.email,
      subject: "Employee is interested in your job offer",
      message,
      html,
    });

    if (sendResult) {
      return res.status(200).json({
        status: "success",
        message: "your interest response message was sent to employer",
      });
    } else {
      return res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    return res.status(500).json({
      error: "There was an error sending to the email. Try again later",
    });
  }
};

const sendEmployerInterestEmail = async (req, res) => {
  let suffhtml =
    "<h1 style='text-align:center'>" +
    "<i><span class='userdarkblue'>is interested in your opportunity!!!</span></i>" +
    "</h1>" +
    "<div><a href='http://localhost:3000/search/" +
    req.body.filterID +
    "'>" +
    "<button class='interest btn' style='background-color:rgb(35, 107, 13)'>PURCHASE THERE PROFILE</button>" +
    "</a></div>" +
    "</div></body></html>";
  await sendEmployerEmail(suffhtml, req, res);
};

const sendEmployerNoInterestEmail = async (req, res) => {
  let suffhtml =
    "<h1 style='text-align:center'>" +
    "<i><span class='userred'>is not interested in your opportunity</span></i>" +
    "</h1>" +
    "<div><a href='http://localhost:3000/search/" +
    req.body.filterID +
    "'>" +
    "<button class='interest btn'>Go back to the search results for this job</button>" +
    "</a></div></div></body></html>";
  await sendEmployerEmail(suffhtml, req, res);
};

export default {
  sendEmployeeEmail,
  sendEmployerInterestEmail,
  sendEmployerNoInterestEmail,
};
