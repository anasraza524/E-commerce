import { Routes, Route ,Navigate} from "react-router-dom";
import './App.css';
import { useState, useEffect,useContext } from "react"
// import Home from './Components/Home';
import Loading from './assets/Loading.gif'
import Nav from './Components/Nav';
import Home from './Pages/Home';
import axios from 'axios';
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import StickyFooter from "./Components/Footer";
import AddToProduct from './Pages/AddToProduct';
import MakeProduct from './Pages/MakeProduct';
import SearchProduct from "./Pages/SearchProduct";
import { GlobalContext } from './Context/Context';

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  const [BageNo, setBageNo] = useState(0)
  const [loadProduct, setLoadProduct] = useState(false)
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
    let response = await axios.post(`${state.baseUrl}/logout`, {
     
    })
    console.log("response: ", response);

    dispatch({
      type: 'USER_LOGOUT'
    })
  } catch (error) {
    console.log("axios error: ", error);
  }

  }

  useEffect(() => {
    
    const getProfile = async () => {
      try {
        // axios.defaults.withCredentials = true;
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true,
          
        })

        console.log("response: ", response);

        dispatch({
          type: 'USER_LOGIN'
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

  return (
    <div >
      
      
       
       {(state.isLogin === false)?
 <Routes>
<Route path="/" element={<Login/>}/>
<Route path="SignUp" element={<SignUp/>}/>
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
