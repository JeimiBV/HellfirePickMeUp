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
        
        <div className="fs-4 ">
         <div className="sliderA text-center start-50 translate-middle-x text-white">  
        <Slider {...settings}>
             <div className="fs-1 ">
              <p>¡Darle una segunda oportunidad a los alimentos es darle un respiro al planeta!</p>
            </div>
            <div className="fs-1 ">
              <p>Tomar buenas decisiones con la comida son buenas inversiones.</p>
            </div>
          
            <div className="fs-1">
              <p>Cualquier cosa es buena si está hecha de chocolate.</p>
            </div>
            <div className="fs-1">
              <p>Cuida los alimentos, cuida el planeta.</p>
            </div>
            <div className="fs-1">
              <p>Se debe comer para vivir, no vivir para comer.</p>
            </div>
            <div className="fs-1">
              <p>Todo lo que necesitas es amor. Pero un poco de chocolate de vez en cuando, no hace daño.</p>
            </div>
          
      
        </Slider>

        </div>

     </div>
    
    );
  }
}