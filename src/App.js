import React, { Suspense } from "react";
import "./App.css";
import Navbar from "./components/routers/navigation/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "./components/context/login-context";

const Home = React.lazy(() => import("./components/home/Home"));
const About = React.lazy(() => import("./components/about/About"));
const Store = React.lazy(() => import("./components/store/Store"));
const Contact = React.lazy(() => import("./components/contact/Contact"));
const ProductDetails = React.lazy(() =>
  import("./components/product-details/ProductDetails")
);
const Login = React.lazy(() => import("./components/login/Login"));
const SignUp = React.lazy(() => import("./components/signup/Signup"));
const ChangePassword = React.lazy(() =>
  import("./components/login/ChangePassword")
);
const Error = React.lazy(() => import("./components/error/Error"));
const Checkout = React.lazy(() => import("./components/checkout/Checkout"));

function App() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="ui segment sementic-loader">
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading</div>
            </div>
          </div>
        }
      >
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
            {isLoggedIn && <Route path="/checkout" element={<Checkout />} />}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
