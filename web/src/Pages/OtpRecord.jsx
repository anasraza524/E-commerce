
import OTPInput from "react18-input-otp";
import { useState,useContext } from "react";
import axios from "axios";
import { GlobalContext } from '../Context/Context';
import {Avatar,Button} from '@mui/material';
import "./OtpRecord.css";
const OtpRecord = () => {
  let { state, dispatch } = useContext(GlobalContext);
    const [OTP, setOTP] = useState("");
  function  handleChange(OTP)  {
    setOTP(OTP);
  
  console.log(OTP)

  }
  const otpCode =async (e) => { 
     
   
    
try{ const res = await axios.post(`${state.baseUrl}/request_otp`, { 
  
  otp: OTP
 }, {
  withCredentials: true
});

if (res) {
  alert("Otp Submit");
}}
catch(err){
console.log("OtpPassowrd Error",err)
}
   

 }

    
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