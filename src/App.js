import "./App.css";
import Navbar from "./components/routers/navigation/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Store from "./components/store/Store";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
