
import OTPInput from "react18-input-otp";
import React, { useState } from "react";
import {Avatar} from '@mui/material';
import "./OtpRecord.css";
const OtpRecord = () => {
    const [OTP, setOTP] = useState("");
  function handleChange(OTP) {
    setOTP(OTP);}
  return (
    <>
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            </Avatar>
  <div class="d-flex justify-content-center align-items-center container">
     
  <div class="card py-5 px-3">
      <h5 class="m-0">Email verification</h5><span class="mobile-text">Enter the code we just send on your Email 
      <br />
      <b class="text-danger">****as@gmail.com</b></span>
      <div class="d-flex flex-row mt-5">
      <OTPInput
          onChange={handleChange}
          value={OTP}
          inputStyle="inputStyle"
          numInputs={5}
          placeholder="0"
          autoComplete="one-time-code"
           separator={<span></span>}
        />
      </div>
      <div class="text-center mt-5"><span class="d-block mobile-text">Don't receive the code?</span><span class="font-weight-bold text-danger cursor">Resend</span></div>
  </div>
</div></>
  )
}

export default OtpRecord ;