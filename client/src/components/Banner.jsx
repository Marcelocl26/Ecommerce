import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        className="h-full"
      >
        <div className="relative w-full h-64">
          <img src="/images/banner 1.jpg" alt="Promoción 1" className="w-full h-full object-contain" />
        </div>
        <div className="relative w-full h-64">
          <img src="/images/banner 2.png" alt="Promoción 2" className="w-full h-full object-contain" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
