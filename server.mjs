import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import auth from './Apis/auth.mjs'
import product from './Apis/product.mjs'
 import addtoCart from './Apis/addtoCart.mjs'

import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import { userModel } from './dbRepo/model.mjs';



//  mongoose.set('strictQuery', false);

const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000', 'https://localhost:3001', "*"],
    credentials: true
}));
// mongodb+srv://anas:12ANASraza786@cluster0.eu5uldj.mongodb.net/?retryWrites=true&w=majority
const SECRET = process.env.SECRET || "topsecret";

// app.use(cors());

app.use(express.json());
app.use(cookieParser());
//  let products = [];
// let addtocart = [];
// let bageNo = 0



// app.post("/api/v1/signup", (req, res) => {

//     let body = req.body;

//     if (!body.firstName
//         || !body.lastName
//         || !body.email
//         || !body.password
//     ) {
//         res.status(400).send(
//             `required fields missing, request example: 
//                 {
//                     "firstName": "John",
//                     "lastName": "Doe",
//                     "email": "abc@abc.com",
//                     "password": "12345"
//                 }`
//         );
//         return;
//     }

//     req.body.email = req.body.email.toLowerCase();

//     // check if user already exist // query email user
//     userModel.findOne({ email: body.email }, (err, user) => {
//         if (!err) {
//             console.log("user: ", user);

//             if (user) { // user already exist
//                 console.log("user already exist: ", user);
//                 res.status(400).send({ message: "user already exist,, please try a different email" });
//                 return;

//             } else { // user not already exist

//                 // bcrypt hash
//                 stringToHash(body.password).then(hashString => {

//                     userModel.create({
//                         firstName: body.firstName,
//                         lastName: body.lastName,
//                         email: body.email,
//                         password: hashString
//                     },
//                         (err, result) => {
//                             if (!err) {
//                                 console.log("data saved: ", result);
//                                 res.status(201).send({ message: "user is created" });
//                             } else {
//                                 console.log("db error: ", err);
//                                 res.status(500).send({ message: "internal server error" });
//                             }
//                         });
//                 })

//             }
//         } else {
//             console.log("db error: ", err);
//             res.status(500).send({ message: "db error in query" });
//             return;
//         }
//     })
// });
// app.post("/api/v1/forget_password",(req, res) => {
//     let body = req.body;
//     body.email = body.email.toLowerCase();
//     if (!body.email ) { // null check - undefined, "", 0 , false, null , NaN
//         res.status(400).send(
//             `required fields missing, request example: 
//                 {
//                     "email": "abc@abc.com"
                  
//                 }`
//         );
//         return;
//     }

//     userModel.findOne({ email: body.email }, (err, user) => {
//         if (!err) {
//             console.log("user: ", user);

//             if (user) { // user already exist
//                 const token = jwt.sign({
//                     _id: user._id,
//                     email: user.email,
//                     iat: Math.floor(Date.now() / 1000) - 30,
//                     exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
//                 }, SECRET);

//                 console.log("token: ", token);

//                 res.cookie('Token', token, {
//                     maxAge: 900,
//                     httpOnly: true,
//                     sameSite: 'none',
//                     secure: true
//                 });
                
//                 // const link = `http://localhost:3001/ResetPassword`;
//                  const link = `http://localhost:3000/user/reset/${user._id}/${token}`;
//                 // const link = `http://localhost:3001/api/v1/forget_password/${user._id}/${token}`;
//                  // email sending
//           const transport = nodemailer.createTransport({
//             service: "gmail",
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             auth: {
//               user:process.env.EMAIL ,
//               pass:process.env.EMAIL_PASSWORD,
//             },
//           });
// console.log("done")
//           const mailOptions = {
//             from: process.env.EMAIL,
//             to: body.email,
//             subject: `Password Reset Request`,
//             text: `
//             <!doctype html>
//             <html lang="en-US">
//             <head>
//                 <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
//                 <title>Reset Password Email Template</title>
//                 <meta name="description" content="Reset Password Email Template.">
//                 <style type="text/css">
//                     a:hover {text-decoration: underline !important;}
//                 </style>
//             </head>
//             <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
//                 <!--100% body table-->
//                 <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
//                     style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
//                     <tr>
//                         <td>
//                             <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
//                                 align="center" cellpadding="0" cellspacing="0">
                                
//                                 <tr>
//                                     <td>
//                                         <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
//                                             style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
//                                             <tr>
//                                                 <td style="height:40px;">&nbsp;</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style="padding:0 35px;">
//                                                     <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
//                                                         requested to reset your password</h1>
//                                                     <span
//                                                         style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
//                                                     <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
//                                                         We cannot simply send you your old password. A unique link to reset your
//                                                         password has been generated for you. To reset your password, click the
//                                                         following link and follow the instructions.
//                                                     </p>
//                                                     <a href=${link}
//                                                         style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
//                                                         Password</a>
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td style="height:40px;">&nbsp;</td>
//                                             </tr>
//                                         </table>
//                                     </td>
                               
//                             </table>
//                         </td>
//                     </tr>
//                 </table>
//                 <!--/100% body table-->
//             </body>
//             </html>`,
//                         html: `
//             <!doctype html>
//             <html lang="en-US">
//             <head>
//                 <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
//                 <title>Reset Password Email Template</title>
//                 <meta name="description" content="Reset Password Email Template.">
//                 <style type="text/css">
//                     a:hover {text-decoration: underline !important;}
//                 </style>
//             </head>
//             <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
//                 <!--100% body table-->
//                 <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
//                     style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
//                     <tr>
//                         <td>
//                             <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
//                                 align="center" cellpadding="0" cellspacing="0">
                               
//                                 <tr>
//                                     <td>
//                                         <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
//                                             style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
//                                             <tr>
//                                                 <td style="height:40px;">&nbsp;</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style="padding:0 35px;">
//                                                     <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
//                                                         requested to reset your password</h1>
//                                                     <span
//                                                         style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
//                                                     <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
//                                                         We cannot simply send you your old password. A unique link to reset your
//                                                         password has been generated for you. To reset your password, click the
//                                                         following link and follow the instructions.
//                                                     </p>
//                                                     <a href="${link}"
//                                                         style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
//                                                         Password</a>
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td style="height:40px;">&nbsp;</td>
//                                             </tr>
//                                         </table>
//                                     </td>
                               
//                             </table>
//                         </td>
//                     </tr>
//                 </table>
//                 <!--/100% body table-->
//             </body>
//             </html>`,
//                       };
//                       console.log("done2")
//                       transport.sendMail(mailOptions, (error, info) => {
//                         console.log("error",error)
//                         console.log("info",info)
//             if (!error) {
//               return res.status(200).json({ message: "Email Sent" });
//             }else{
//                 return res.status(400).json({ message: "Error in Sending Email " });
//             }
            
//           });
                      

//             }else { // user not already exist
//                 console.log("userEmail not found");
//                 res.status(401).send({ message: "Invalid Email" });
//                 return;
//             }
   
//         }})
   
//     });
// app.put("/api/v1/forget_password/:id/:token",(req, res) => {
//         let body = req.body
//        console.log('1')
//         const { id, token } = req.params;
//         if(!body.password,!body._id,!body.token){
//             res.status(400).send(
//                 `required fields missing, request example: 
//                     {
//                         "password": "12345"
                      
//                     }`
//             );
//             console.log('2')
//             if (!req?.cookies?.token) {
//                 res.status(401).send({
//                     message: "0include http-only credentials with every request"
//                 })
//                 return;
//             }
//             jwt.verify(req.cookies.token, SECRET, function (err, decodedData) {
//                 if (!err) {
//                     console.log('3')
//                     console.log("decodedData: ", decodedData);
        
//                     const nowDate = new Date().getTime() / 1000;
        
//                     if (decodedData.exp < nowDate) {
        
//                         res.status(401);
//                         res.cookie('Token', '', {
//                             maxAge: 1,
//                             httpOnly: true,
//                             sameSite: 'none',
//                             secure: true
                            
                            
//                         });
//                         res.send({ message: "token expired" })
        
//                     } else {
        
//                         console.log("token approved");
        
//                         req.body.token = decodedData
//                         const isUser =  userModel.findById(id);
//                         stringToHash(body.password).then(hashString => {
        
//                             userModel.findByIdAndUpdate(body._id,{
                              
//                                 password: hashString
//                             },
//                                 (err, result) => {
//                                     if (!err) {
//                                         console.log("data saved: ", result);
//                                         res.status(201).send({ message: "Password Changed Successfully" });
//                                     } else {
//                                         console.log("db error: ", err);
//                                         res.status(400).send({ message: "Link has been Expired" });
//                                     }
//                                 });
//                         })
//                     }
//                 } else {
//                     res.status(401).send("invalid token")
//                 }
//             });
        
            
//             // const isSuccess =  authModel.findByIdAndUpdate(isUser._id, {
//             //     $set: {
//             //       password: hashedPass,
//             //     },
//             //   });
//             // return;
//         }
        
        
        
//         }
        
        
        
//         )
// app.put("/api/v1/forget_password/:id/:token",(req, res) => {
//     let body = req.body
//    console.log('1')
//     const { _id, token } = req.params;
//     if(!body.password,!_id,!token){
//         res.status(400).send(
//             `required fields missing, request example: `
            

//         );
//         return;}

//         try {
//             stringToHash(body.password).then(hashString => {
    
                                
//             let data =  userModel.findByIdAndUpdate(_id,
//                 {
//                     password: hashString
//                 },
//                 { new: true }
//             ).exec();
    
//             console.log('updated: ', data);
    
//             res.send({
//                 message: "product modified successfully"
//             });
    
//         })} catch (error) {
//             res.status(500).send({
//                 message: "server error"
//             })
//         }

//     }

//     )
// app.post("/api/v1/login", (req, res) => {

//     let body = req.body;
//     body.email = body.email.toLowerCase();

//     if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
//         res.status(400).send(
//             `required fields missing, request example: 
//                 {
//                     "email": "abc@abc.com",
//                     "password": "12345"
//                 }`
//         );
//         return;
//     }

//     // check if user exist
//     userModel.findOne(
//         { email: body.email },
//         "firstName lastName email password",
//         (err, data) => {
//             if (!err) {
//                 console.log("data: ", data);

//                 if (data) { // user found
//                     varifyHash(body.password, data.password).then(isMatched => {

//                         console.log("isMatched: ", isMatched);

//                         if (isMatched) {

//                             const token = jwt.sign({
//                                 _id: data._id,
//                                 email: data.email,
//                                 iat: Math.floor(Date.now() / 1000) - 30,
//                                 exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
//                             }, SECRET);

//                             console.log("token: ", token);

//                             res.cookie('Token', token, {
//                                 maxAge: 86_400_000,
//                                 httpOnly: true,
//                                 sameSite: 'none',
//                                 secure: true
//                             });

//                             res.send({
//                                 message: "login successful",
//                                 profile: {
//                                     email: data.email,
//                                     firstName: data.firstName,
//                                     lastName: data.lastName,
                                    
//                                     _id: data._id
//                                 }
//                             });
//                             return;
//                         } else {
//                             console.log("password did not match");
//                             res.status(401).send({ message: "Incorrect email or password" });
//                             return;
//                         }
//                     })

//                 } else { // user not already exist
//                     console.log("user not found");
//                     res.status(401).send({ message: "Incorrect email or password" });
//                     return;
//                 }
//             } else {
//                 console.log("db error: ", err);
//                 res.status(500).send({ message: "login failed, please try later" });
//                 return;
//             }
//         })
// })

// app.post("/api/v1/logout", (req, res) => {

//     res.cookie('Token', '', {
//         maxAge: 1,
//         httpOnly: true,
//         sameSite: 'none',
//         secure: true
//     });

//     res.send({ message: "Logout successful" });
// })

app.use('/api/v1', auth)
app.use('/api/v1',(req, res, next) => {

    console.log("req.cookies: ", req.cookies);

    if (!req?.cookies?.Token) {
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
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})
app.use('/api/v1', product)
app.use('/api/v1', addtoCart)



const getUser =async () => { 
if(req.params.id){
    _id = req.params.id
}else{
    _id = req.params.token._id
}
try{
const user = await userModel.findOne({ _id: _id },"email firstName lastName -_id").exec()
if (!user) {
    res.status(404).send({message:"Error data not found"})
    return;
} else {

    // res.set({
    //     "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    //     "Pragma": "no-cache",
    //     "Expires": "0",
    //     "Surrogate-Control": "no-store"
    // });
    res.status(200).send(user)
    .send({message:"working"})
}

} catch (error) {

console.log("error: ", error);
res.status(500).send({
    message: "something went wrong on server",
});
}
}

app.use("api/v1/prodile",getUser)
app.use("api/v1/prodile/:id",getUser)


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

