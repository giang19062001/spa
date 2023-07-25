import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./page/user/home";
import React, { useEffect } from "react";
import BookingPage from "./page/user/booking";
import HomeAdmin from "./page/admin/home";
import ShopPage from "./page/user/shop";
import CartPage from "./page/user/cart";
import aos from 'aos'
import 'aos/dist/aos.css'
import UserPage from "./page/user/user";
import ProductPage from "./page/user/product";
import ServicePage from "./page/user/service";
import './App.scss'
function App() {

 useEffect(()=>{
   aos.init({duration:1000})
 },[])

  return (
<BrowserRouter>
    <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/booking" element={<BookingPage></BookingPage>}></Route>
    <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
    <Route path="/cart" element={<CartPage></CartPage>}></Route>
    <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
    <Route path="/service/:id" element={<ServicePage></ServicePage>}></Route>

    <Route path="/user/:id" element={<UserPage></UserPage>}></Route>
    <Route path="/admin" element={<HomeAdmin></HomeAdmin>}></Route>

    </Routes>
</BrowserRouter>
  );
}

export default App;
