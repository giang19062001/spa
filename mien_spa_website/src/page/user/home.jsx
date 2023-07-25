import * as React from "react";
import Appbar from "../../component/user/home/appbar"
import CarouselComponent from "../../component/user/home/carousel"
import Doctor from "../../component/user/home/doctor"
import Extra from "../../component/user/home/extra"
import Facility from "../../component/user/home/facility"
import Feedback from "../../component/user/home/feedback"
import Footer from "../../component/user/home/footer"
import Service from "../../component/user/home/service"
import Treatment from "../../component/user/home/treatment"
import { useDispatch } from "react-redux";
import { fetchServices } from "../../redux/serce/serviceThunk";
import { fetchProducts } from "../../redux/product/productThunk";


const Home = () =>{
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(fetchServices());
      dispatch(fetchProducts())
    }, [dispatch]);

    return(
        <>
        <Appbar ></Appbar>
        <CarouselComponent></CarouselComponent>
        <Service></Service>
         <Facility></Facility>
         <Doctor></Doctor>
         <Treatment></Treatment>
         <Feedback></Feedback>
         <Extra></Extra>
         <Footer></Footer>
         
        </>

    )
}
export default Home