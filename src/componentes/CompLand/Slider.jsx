import React, { Component } from "react";
import Slider from "react-slick";
import '../../estilos/Landing.css'

export default class SwipeToSlide extends Component {

  
  render() {
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "50px",
      slidesToShow: 3,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

    };

    
    return (
        <div>
       
          <div className="containerB top-110 start-50 translate-middle-x">
            
            <Slider {...settings}>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen1.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen2.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen3.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen4.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
              <img src="../../../src/imagenes/imagen5.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen6.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen7.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen8.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="../../../src/imagenes/imagen10.jpg" alt="..." width={270} height={200}/>
              </div>
            </Slider>
  
          </div>
  
        </div>
      );
  }
}