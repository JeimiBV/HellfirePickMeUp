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
       <div className="sliderA text-center start-50 translate-middle-x">  
        <Slider {...settings}>
          <div>
              <p>¡Darle una segunda oportunidad a los alimentos es darle un respiro al planeta!</p>
            </div>
            <div>
              <p>Tomar buenas decisiones con la comida son buenas inversiones.</p>
            </div>
          
            <div>
              <p>Cualquier cosa es buena si está hecha de chocolate.</p>
            </div>
            <div>
              <p>Cuida los alimentos, cuida el planeta.</p>
            </div>
            <div>
              <p>Se debe comer para vivir, no vivir para comer.</p>
            </div>
            <div>
              <p>Todo lo que necesitas es amor. Pero un poco de chocolate de vez en cuando, no hace daño.</p>
          </div>
      
        </Slider>
      </div>
    </div>
      
    );
  }
}