import "./App.css";
import Button from "./components/button/Button";
import Directory from "./components/Directory/Directory";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/routers/navigation/Navbar";

function App() {
  const productsArr = [
    {
      id:1,
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      id:2,
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      id:3,
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      id:4,
      title: "Blue Color",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];
  return (
    <div className="App">
      <Navbar/>
      <Header/>
     <Directory categories={productsArr}/>
     <Button name="See the cart"/>
     <Footer/>
    </div>
  );
}

export default App;
