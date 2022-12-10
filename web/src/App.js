import { Routes, Route ,Navigate} from "react-router-dom";
import './App.css';
// import Home from './Components/Home';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import AddToProduct from './Pages/AddToProduct';
import MakeProduct from './Pages/MakeProduct';
import SearchProduct from "./Pages/SearchProduct";
function App() {
  return (
    <div >
       <Nav/>
       
       <Routes>
     


     <Route path="/" element={<Home/>} />
     <Route path="AddToProduct" element={<AddToProduct/>} />
     <Route path="MakeProduct" element={<MakeProduct/>} />
     <Route path="SearchProduct" element={<SearchProduct/>} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />
     </Routes>
      
    </div>
  );
}

export default App;
