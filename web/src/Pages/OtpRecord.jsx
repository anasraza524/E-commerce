
import OTPInput from "react18-input-otp";
import { useState,useContext } from "react";
import axios from "axios";
import { GlobalContext } from '../Context/Context';
import {Avatar,Button} from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./OtpRecord.css";
const OtpRecord = () => {
  let { state, dispatch } = useContext(GlobalContext);
    const [OTP, setOTP] = useState("");
  function  handleChange(OTP)  {
    setOTP(OTP);
  
  console.log(OTP)

  }
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const notify = () => toast.error(error, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;
    
  const navigate = useNavigate();
  const otpCode =async (e) => { 
     
   
    
try{ const res = await axios.post(`${state.baseUrl}/request_otp`, { 
  
  otp: OTP
 }, {
  withCredentials: true
});

if (res) {
  alert("Otp Submit");
}
if(res.status === 200) {
        
  navigate("/ResetPassword");
}}
  
catch(err){
  notify()
  setError(err.response.data.message)
console.log("OtpPassowrd Error",err)
}
   

 }

    
  return (
    <>
            <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            </Avatar>
  <div class="d-flex justify-content-center align-items-center container">
     
  <div class="card py-5 px-3">
      <h5 class="m-0">Email verification</h5><span class="mobile-text">Enter the code we just send on your Email 
      <br />
      <b class="text-danger">*****@gmail.com</b></span>
      <div class="d-flex flex-row mt-5">
      <OTPInput
          onChange={handleChange}
          value={OTP}
          inputStyle="inputStyle"
          numInputs={5}
        
          autoComplete="one-time-code"
           separator={<span></span>}
        />
       
      </div>
      <Button onClick={otpCode}> Submit</Button>
      <div class="text-center mt-5"><span class="d-block mobile-text">Don't receive the code?</span><span class="font-weight-bold text-danger cursor">Resend</span></div>
  </div>
</div></>
  )
}

export default OtpRecord ;