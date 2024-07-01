// src/components/PromotionsBanner.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faTag, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './PromotionBanner.css';

const PromotionsBanner = () => {
    return (
        <div className="promotions-banner">
            <div className="promotions-item main-item">
                <p style={{fontSize:"45px", textAlign:"left", marginLeft:"50px"}}>
                    {localStorage.getItem("lenguaje") === "ES" ? "Busca y reserva tu lugar perfecto" : "Find and book your perfect stay"}
                </p>
            </div>
            <div className="promotions-item">
                <FontAwesomeIcon icon={faMoon} className="icon" />
                <p style={{fontSize:"20px"}}>
                    {localStorage.getItem("lenguaje") === "ES" ? "Llévate recompensas por cada noche de tu estancia" : "Earn rewards for each night of your stay"}
                </p>
            </div>
            <div className="promotions-item">
                <FontAwesomeIcon icon={faTag} className="icon" />
                <p style={{fontSize:"20px"}}>
                    {localStorage.getItem("lenguaje") === "ES" ? "Ahorra más con los precios para miembros" : "Save money with the member prices"}
                </p>
            </div>
            <div className="promotions-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <p style={{fontSize:"20px"}}>
                    {localStorage.getItem("lenguaje") === "ES" ? "Opciones de cancelación gratuita si cambias de planes" : "Free cancellation options if plans change"}
                </p>
            </div>
        </div>
    );
};

export default PromotionsBanner;
