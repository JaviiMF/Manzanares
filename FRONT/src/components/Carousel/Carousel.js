import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'; // Puedes agregar estilos personalizados aquí
import { useNavigate } from "react-router-dom";

const CarouselComponent = () => {
    const images = [
        { src: '/images/Room_Image/habitacion_doble_alta.jpg', alt: 'Habitación 1' },
        { src: '/images/Room_Image/habitacion_doble_baja.jpg', alt: 'Habitación 2' },
        { src: '/images/Room_Image/habitacion_doble_media.jpg', alt: 'Habitación 3' },
        { src: '/images/Room_Image/habitacion_simple_alta.jpg', alt: 'Habitación 4' },
        { src: '/images/Room_Image/habitacion_simple_baja.jpg', alt: 'Habitación 5' },
        { src: '/images/Room_Image/habitacion_simple_media.jpg', alt: 'Habitación 6' },
    ];

    const navigate = useNavigate();

    const handleReserveClick = () => {

        const dni = localStorage.getItem('userDni');
        if (dni) {
            navigate("/CrearReserva");
        } else {
            alert("Para realizar cualquier reserva debes estar registrado!");
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
                            {localStorage.getItem("lenguaje") === "ES" ? "RESERVA YA" : "RESERVE NOW"}
                        </p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
