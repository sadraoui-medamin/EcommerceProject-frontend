import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/App/header/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import BackToTopButton from "./components/BackToTopButton ";
import { useState } from "react";
import ScrollToTop from "./components/GoToTopScroll";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/App/footer/Footer";
import Collec from "./pages/Collec";
import FavoritesProducts from "./pages/FavouriteProduct";
import CompareProduct from "./pages/CompareProduct";
import Profile from "./pages/ProfileSettings";
export default function App(){
  //if user !loginned  we must show login button 
  const [setShowLogin] = useState(true);
  // modal login & sign up
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);   
  };
return (
<BrowserRouter >
  <ScrollToTop />
  <ToastContainer />
  <div className="flex flex-col min-h-screen">
  <Header setShowLogin={setShowLogin} isModalOpen={isModalOpen} toggleModal={toggleModal}/>
  
  <div className="flex-grow animate-fadeIn -mt-16 md:mt-0">
    <Routes> 
      <Route path="/" element={<Home toggleModal={toggleModal} />} />
      <Route path="/product" element={<Product toggleModal={toggleModal}/>}>
        <Route path=":productId" element={<Product toggleModal={toggleModal} />}/>
      </Route>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/collection/:category?/:subCategory?/:subSubCategory?" element={<Collec toggleModal={toggleModal}/>} />
      <Route path="/place-order" element={<Order />}/>
      <Route path="/verify" element={<Verify />}/>
      <Route path="/myorders" element={<MyOrders />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/compares" element={<CompareProduct />}/>
      <Route path="/favorites" element={<FavoritesProducts />}/>
      <Route path="/profile" element={<Profile setShowLogin={setShowLogin}/>}/>
    </Routes>
  </div>
  
  <BackToTopButton />
  <Footer />
</div>

</BrowserRouter>

);
}