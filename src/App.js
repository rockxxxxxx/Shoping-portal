import "./App.css";
import Navbar from "./components/routers/navigation/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Store from "./components/store/Store";
import Contact from "./components/contact/Contact";
import ProductDetails from "./components/product-details/ProductDetails";
import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";
import ChangePassword from "./components/login/ChangePassword";
import { useContext } from "react";
import { LoginContext } from "./components/context/login-context";
import Error from "./components/error/Error";

function App() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          {isLoggedIn && <Route path="/store" element={<Store />} />}
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
          {isLoggedIn && (
            <Route path="/changepassword" element={<ChangePassword />} />
          )}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
