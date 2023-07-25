import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/carousel.scss'

const CarouselComponent = () =>  {
    return (
            <Carousel autoPlay showThumbs={false} infiniteLoop={true} >
                <img alt="" src={require("../../../assets/carousel1.jpg")} 
                 id="imgCarousel" />
                <img alt="" src={require("../../../assets/carousel2.png")} 
                 id="imgCarousel"/>
           
        </Carousel>
    )
}
export default CarouselComponent
