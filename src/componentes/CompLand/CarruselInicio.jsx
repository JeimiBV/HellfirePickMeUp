import React, { Component } from "react";
import Slider from "react-slick";
import '../../estilos/Landing.css'


export default class AutoPlay extends Component {
  render() {
   
      const settings = {
      
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 800,
      autoplaySpeed: 5000,
      cssEase: "linear"
     
    };
    return (
        
        
        <Slider {...settings}>
          
      
        </Slider>
    
    );
  }
}