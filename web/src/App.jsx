import { Routes, Route ,Navigate} from "react-router-dom";
import './App.css';
import { useState, useEffect,useContext } from "react"
// import Home from './Components/Home';
import Loading from './assets/Loading.gif'
import Nav from './Components/Nav';
import OtpRecord from "./Pages/OtpRecord";
import Home from './Pages/Home';
import axios from 'axios';
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import StickyFooter from "./Components/Footer";
import AddToProduct from './Pages/AddToProduct';
import MakeProduct from './Pages/MakeProduct';
import SearchProduct from "./Pages/SearchProduct";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import { GlobalContext } from './Context/Context';
import { ImportExportRounded } from "@mui/icons-material";

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  const [BageNo, setBageNo] = useState(0)
  const [loadProduct, setLoadProduct] = useState(false)
  // addtocart api call
  useEffect(() => {
    
    (async () => {
      const response =
        await axios.get(`${state.baseUrl}/addtocarts`,{
         
            withCredentials: true,
            
         
        })
       
      console.log("addtocart", response.data.data)
    setBageNo(response.data.data.length)
   
    })();
  }, [loadProduct]);




 const  LogoutHandle = async()=>{
  try {
    let response = await axios({
      withCredentials:true,
      method: "POST",
      url: `${state.baseUrl}/logout`,
      headers: {
        "Content-Type": "application/json",
      }}
   
    )

    console.log("response: ", response);

    dispatch({
      type: 'USER_LOGOUT'
    })
  } catch (error) {
    console.log("axios error: ", error);
  }

  }
// remain login api call
  useEffect(() => {
    
    const getProfile = async () => {
      try {
        // axios.defaults.withCredentials = true;
        let response = await axios.get(`${state.baseUrl}/profile`, {
          withCredentials: true,
          
        })

        console.log("responseApp: ", response);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data

        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])
  // Inercepter of withCredentials = true;
  
//   useEffect(() => {

//     // Add a request interceptor
//     axios.interceptors.request.use(function (config) {
//       // Do something before request is sent
//       config.withCredentials = true;
//       return config;
//     }, function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     });
// axios.interceptors.request.use(function(config){

// })
//     // Add a response interceptor
//     axios.interceptors.response.use(function (response) {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response;
//     }, function (error) {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       if (error.response.status === 401) {
//         dispatch({
//           type: 'USER_LOGOUT'
//         })
//       }
//       return Promise.reject(error);
//     });
//   }, [])


  return (
    <div >
      
      
   
       {(state.isLogin === false)?
 <Routes>
<Route path="/" element={<Login/>}/>
<Route path="SignUp" element={<SignUp/>}/>
<Route path="ForgetPassword" element={<ForgetPassword/>}/>
<Route path="OtpRecord" element={<OtpRecord/>}/>
<Route path="/user/reset/:id/:token" element={<ResetPassword/>}/>
 <Route path="*" element={<Navigate to="/" replace={true} />}/> 

</Routes> :null
}
{(state.isLogin===true)?
<div>
<Nav LogoutHandle={LogoutHandle} BageNo={BageNo}/> 

 <Routes>

     <Route path="/" element={<Home  setBageNo={setBageNo}
       BageNo={BageNo}/>} />
     <Route path="AddToProduct" element={<AddToProduct
setBageNo={setBageNo}
       BageNo={BageNo}/>} />
       
     <Route path="MakeProduct" element={<MakeProduct/>} />
     <Route path="SearchProduct" element={<SearchProduct/>} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />
     </Routes> 
     <StickyFooter/>
     </div>:null}
     {(state.isLogin === null) ?

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
  <img width={300} src={Loading} alt="" />
</div>

: null}
    </div>
  );
}

export default App;
