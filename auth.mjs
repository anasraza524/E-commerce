
import dotenv from './dotenv'
import nodemailer from "nodemailer";
dotenv.config();

app.post("/forget_password",(req, res) => {
    let body = req.body;
    body.email = body.email.toLowerCase();
    if (!body.email ) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com"
                  
                }`
        );
        return;
    }

    userModel.findOne({ email: body.email }, (err, user) => {
        if (!err) {
            console.log("user: ", user);

            if (user) { // user already exist
                const token = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                }, SECRET);

                console.log("token: ", token);

                res.cookie('Token', token, {
                    maxAge: 90,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
                const link = `http://localhost:3000/user/reset/${user._id}/${token}`;
                 // email sending
          const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Password Reset Request`,
            text: `
            <!doctype html>
            <html lang="en-US">
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <title>Reset Password Email Template</title>
                <meta name="description" content="Reset Password Email Template.">
                <style type="text/css">
                    a:hover {text-decoration: underline !important;}
                </style>
            </head>
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                <!--100% body table-->
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                        requested to reset your password</h1>
                                                    <span
                                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                        We cannot simply send you your old password. A unique link to reset your
                                                        password has been generated for you. To reset your password, click the
                                                        following link and follow the instructions.
                                                    </p>
                                                    <a href=${link}
                                                        style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                        Password</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                               
                            </table>
                        </td>
                    </tr>
                </table>
                <!--/100% body table-->
            </body>
            </html>`,
                        html: `
            <!doctype html>
            <html lang="en-US">
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <title>Reset Password Email Template</title>
                <meta name="description" content="Reset Password Email Template.">
                <style type="text/css">
                    a:hover {text-decoration: underline !important;}
                </style>
            </head>
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                <!--100% body table-->
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                               
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                        requested to reset your password</h1>
                                                    <span
                                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                        We cannot simply send you your old password. A unique link to reset your
                                                        password has been generated for you. To reset your password, click the
                                                        following link and follow the instructions.
                                                    </p>
                                                    <a href="${link}"
                                                        style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                        Password</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                               
                            </table>
                        </td>
                    </tr>
                </table>
                <!--/100% body table-->
            </body>
            </html>`,
                      };
                      transport.sendMail(mailOptions, (error, info) => {
            if (!error) {
              return res.status(200).json({ message: "Email Sent" });
            }else{
                return res.status(400).json({ message: "Error in Sending Email " });
            }
            
          });
                      

            }else { // user not already exist
                console.log("userEmail not found");
                res.status(401).send({ message: "Invalid Email" });
                return;
            }
   
        }})
   
    });


// some mistake 
// app.post("/forget_password/:id/:token",(req, res) => {
// let body = req.body
// const { id, token } = req.params;
// if(!body.password){
//     res.status(400).send(
//         `required fields missing, request example: 
//             {
//                 "password": "12345"
              
//             }`
//     );
//     const isUser =  userModel.findById(id);
//     const isValid = jwt.verify(token, SECRET)
//     stringToHash(body.password).then(hashString => {

//         userModel.findByIdAndUpdate(isUser._id,{
          
//             password: hashString
//         },
//             (err, result) => {
//                 if (!err) {
//                     console.log("data saved: ", result);
//                     res.status(201).send({ message: "Password Changed Successfully" });
//                 } else {
//                     console.log("db error: ", err);
//                     res.status(400).send({ message: "Link has been Expired" });
//                 }
//             });
//     })
//     // const isSuccess =  authModel.findByIdAndUpdate(isUser._id, {
//     //     $set: {
//     //       password: hashedPass,
//     //     },
//     //   });
//     // return;
// }



// }



// )




app.post("/forget_password/:id/:token",(req, res) => {
    let body = req.body
    const { id, token } = req.params;
    if(!body.password){
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "password": "12345"
                  
                }`
        );
        
        if (!req?.cookies?.token) {
            res.status(401).send({
                message: "include http-only credentials with every request"
            })
            return;
        }
        jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
            if (!err) {
    
                console.log("decodedData: ", decodedData);
    
                const nowDate = new Date().getTime() / 1000;
    
                if (decodedData.exp < nowDate) {
    
                    res.status(401);
                    res.cookie('Token', '', {
                        maxAge: 1,
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true
                        
                        
                    });
                    res.send({ message: "token expired" })
    
                } else {
    
                    console.log("token approved");
    
                    req.body.token = decodedData
                    const isUser =  userModel.findById(id);
                    stringToHash(body.password).then(hashString => {
    
                        userModel.findByIdAndUpdate(body._id,{
                          
                            password: hashString
                        },
                            (err, result) => {
                                if (!err) {
                                    console.log("data saved: ", result);
                                    res.status(201).send({ message: "Password Changed Successfully" });
                                } else {
                                    console.log("db error: ", err);
                                    res.status(400).send({ message: "Link has been Expired" });
                                }
                            });
                    })
                }
            } else {
                res.status(401).send("invalid token")
            }
        });
    
        
        // const isSuccess =  authModel.findByIdAndUpdate(isUser._id, {
        //     $set: {
        //       password: hashedPass,
        //     },
        //   });
        // return;
    }
    
    
    
    }
    
    
    
    )