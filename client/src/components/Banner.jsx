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
          <img src="/images/banner 1.jpg" alt="Promoción 1" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Promoción 1</h2>
            <p className="text-lg">Detalles de la promoción 1</p>
          </div>
        </div>
        <div className="relative w-full h-64">
          <img src="/images/banner 2.png" alt="Promoción 2" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Promoción 2</h2>
            <p className="text-lg">Detalles de la promoción 2</p>
          </div>
        </div>
        {}
      </Carousel>
    </div>
  );
};

export default Banner;
