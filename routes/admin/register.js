const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const { RegisterValidation } = require("../../utils/RegisterValidation");
// const nodemailer = require("nodemailer");
// const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// const EMAIL = process.env.EMAIL;
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    let { email, password, adminName, confirm_password } = req.body;
    let { error } = RegisterValidation({
      email,
      adminName,
      password,
      confirm_password,
    });
    if (error) {
      return res
        .status(401)
        .json({ status: false, error: error.details[0].message });
    }
    let existedAdmin = await Admin.find({ $or: [{ email }, { adminName }] });
    if (existedAdmin.length !== 0) {
      return res.status(401).json({
        status: false,
        existedEmailError:
          "This user is already exist, please try another email or adminname",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newAdmin = new Admin({
      email,
      password: hashedPassword,
      adminName,
    });
    //     const transporter = nodemailer.createTransport({
    //       host: "smtp-mail.outlook.com",
    //       port: 587,
    //       auth: {
    //         user: EMAIL,
    //         pass: EMAIL_PASSWORD,
    //       },
    //     });
    //     const output = `
    //    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    // <html xmlns="http://www.w3.org/1999/xhtml">
    //   <head>
    //     <meta charset="UTF-8" />
    //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    //     <meta name="viewport" content="width=device-width,initial-scale=1" />
    //     <title>Document</title>
    //   </head>
    //   <body>
    //     <style></style>
    //     <h1
    //       style="
    //         color: #069ba0;
    //         font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    //         font-size: 1.2 rem;
    //         font-weight: 700;
    //       "
    //     >
    //       Welcome ${adminName} To My App
    //     </h1>
    //     <h2 style="color: #ade552; font-size: 1rem">
    //       your account has been created successfully
    //     </h2>
    //     <h3>one more step, please click the link below to verify your email</h3>
    //     <button style="all:unset;background-color:#9573fe;color: white;"><a href="http://localhost:5000/api/user/verifyEmail?email=${email}" target="_blank">Verify Your Account</a></button>
    //   </body>
    // </html>

    // `;
    //     const mailOptions = {
    //       from: '"My App" <wassimbjaoui10@gmail.com>"',
    //       to: email,
    //       subject: "Please verify your email",
    //       html: output,
    //     };
    //     transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log("Email sent: " + info.response);
    //       }
    //     });
    const admin = await newAdmin.save();
    res.status(200).json({
      status: true,
      message: "Congratulation! Your account has been created successfully.",
    });
  } catch (error) {
    if (err) throw err;
    res.status(400).json({ error });
  }
};
