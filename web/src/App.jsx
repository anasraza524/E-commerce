import { Routes, Route ,Navigate} from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react"
// import Home from './Components/Home';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import AddToProduct from './Pages/AddToProduct';
import MakeProduct from './Pages/MakeProduct';
import SearchProduct from "./Pages/SearchProduct";
function App() {

  const [BageNo, setBageNo] = useState(0)
  const AddTheProduct =()=>{
setBageNo(BageNo+1)




  }

  return (
    <div >
       <Nav BageNo={BageNo}/>

     
       <Routes>
     


     <Route path="/" element={<Home AddTheProduct={AddTheProduct}/>} />
     <Route path="AddToProduct" element={<AddToProduct/>} />
     <Route path="MakeProduct" element={<MakeProduct/>} />
     <Route path="SearchProduct" element={<SearchProduct/>} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />
     </Routes>
      
    </div>
  );
}

export default App;
