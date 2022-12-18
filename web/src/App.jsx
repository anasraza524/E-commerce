import { Routes, Route ,Navigate} from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react"
// import Home from './Components/Home';

import Nav from './Components/Nav';
import Home from './Pages/Home';
import axios from 'axios';
import StickyFooter from "./Components/Footer";
import AddToProduct from './Pages/AddToProduct';
import MakeProduct from './Pages/MakeProduct';
import SearchProduct from "./Pages/SearchProduct";
let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:3000`;
}
function App() {
  
  const [BageNo, setBageNo] = useState(0)
  const [loadProduct, setLoadProduct] = useState(false)
  useEffect(() => {
    
    (async () => {
      const response =
        await axios.get(`${baseUrl}/addtocarts`);
      
      console.log("addtocart", response.data.data)
    setBageNo(response.data.data.length)
   
    })();
  }, [loadProduct]);
  


  return (
    <div >
       <Nav BageNo={BageNo}/>

       
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
    </div>
  );
}

export default App;
