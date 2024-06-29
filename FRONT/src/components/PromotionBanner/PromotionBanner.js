// src/components/PromotionsBanner.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faTag, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './PromotionBanner.css';

const PromotionsBanner = () => {
    return (
        <div className="promotions-banner">
            <div className="promotions-item main-item">
                <p style={{fontSize:"45px", textAlign:"left", marginLeft:"50px"}}>Busca y reserva tu lugar perfecto</p>
            </div>
            <div className="promotions-item">
                <FontAwesomeIcon icon={faMoon} className="icon" />
                <p style={{fontSize:"20px"}}>Llévate recompensas por cada noche de tu estancia</p>
            </div>
            <div className="promotions-item">
                <FontAwesomeIcon icon={faTag} className="icon" />
                <p style={{fontSize:"20px"}}>Ahorra más con los precios para miembros</p>
            </div>
            <div className="promotions-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <p style={{fontSize:"20px"}}>Opciones de cancelación gratuita si cambias de planes</p>
            </div>
        </div>
    );
};

export default PromotionsBanner;
