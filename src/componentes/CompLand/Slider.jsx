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
      <div className="pt-4  m-3">
       
      <div className="containerB start-50 translate-middle-x">
            
            <Slider {...settings}>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://www.evecorp.bo/wp-content/uploads/2020/10/7-3.jpg" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/8173488/pexels-photo-8173488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
              <img src="https://images.pexels.com/photos/1448721/pexels-photo-1448721.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/3026810/pexels-photo-3026810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/4731078/pexels-photo-4731078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
              <div className = "container-slides-item">
                <img src="https://images.pexels.com/photos/5604809/pexels-photo-5604809.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." width={270} height={200}/>
              </div>
            </Slider>
  
          </div>
  
        </div>
      );
  }
}