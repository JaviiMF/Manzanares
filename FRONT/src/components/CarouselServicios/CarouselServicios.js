import React, {useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselServicios.css'; // Puedes agregar estilos personalizados aquí
import { useNavigate } from "react-router-dom";

const CarouselComponent = () => {
    const images = [
        { src: '/images/Service_Image/gimnasio.jpg', alt: 'Habitación 1' },
        { src: '/images/Service_Image/piscina.jpg', alt: 'Habitación 2' },
        { src: '/images/Service_Image/spa.jpg', alt: 'Habitación 3' },
        { src: '/images/Service_Image/sauna.jpg', alt: 'Habitación 4' },
        { src: '/images/Service_Image/restaurante.jpg', alt: 'Habitación 5' },
    ];

    const navigate = useNavigate();

    const handleReserveClick = () => {

        const dni = localStorage.getItem('userDni');
        if (dni) {
            navigate("/CrearReserva");
        } else {
            alert("Para contratar cualquier servicio debes estar registrado!");
            navigate("/login");
        }
    };

    return (
        <div className="carousel-container">
            <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={6000}
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.src} alt={image.alt} />
                        <p className="legend" onClick={handleReserveClick}>
                            CONTRATA YA
                        </p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
