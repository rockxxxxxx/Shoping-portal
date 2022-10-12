import "./App.css";
import Navbar from "./components/routers/navigation/Navbar";
import {Route,Routes} from 'react-router-dom'
import Home from "./components/home/Home";


function App() {
 
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Navbar/>}>
      <Route index element={<Home/>} />
      </Route>
      
    </Routes>
    </div>
  );
}

export default App;
