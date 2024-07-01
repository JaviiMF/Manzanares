import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Carousel from '../Carousel/Carousel.js'
import PromotionBanner from "../PromotionBanner/PromotionBanner";
import CarouselServicios from "../CarouselServicios/CarouselServicios";

function App() {
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('Madrid');
    const [inputCity, setInputCity] = useState('');
    const [lenguaje, setLenguaje] = useState('ES'); // Valor por defecto

    useEffect(() => {
        const storedLenguaje = localStorage.getItem('lenguaje');
        if (!storedLenguaje) {
            localStorage.setItem('lenguaje', 'ES');
        } else {
            setLenguaje(storedLenguaje);
        }

        const fetchForecast = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=297cdd58f8a105f8cedf912fc55aacd9&units=metric`);
                setForecast(response.data);
            } catch (error) {
                console.error("Error fetching the weather data", error);
            }
        };

        fetchForecast();
    }, [city]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("es-ES", { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    };

    const getBackgroundImage = (description) => {
        switch (description) {
            case 'clear sky':
                return 'clear-sky.jpg';
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
            case 'overcast clouds':
                return 'clouds.jpg';
            case 'shower rain':
            case 'rain':
            case 'light rain':
            case 'thunderstorm':
                return 'rain.jpg';
            case 'snow':
                return 'snow.jpg';
            case 'mist':
                return 'mist.jpg';
            default:
                return 'default.jpg';
        }
    };

    return (
        <div className="App">
            <PromotionBanner/>
            {forecast ? (
                <div className="forecast-container">
                    <form className="forecast-form">
                        {forecast.list.map((weather, index) => (
                            <div
                                key={index}
                                className="forecast-item"
                                style={{
                                    backgroundImage: `url(/images/${getBackgroundImage(weather.weather[0].description)})`
                                }}
                            >
                                <label>
                                    <p>{localStorage.getItem("lenguaje") === "ES" ? "Dia:" : "Day:"} {formatDate(weather.dt)}</p>
                                    <p>{localStorage.getItem("lenguaje") === "ES" ? "Temperatura:" : "Temperature:"} {weather.main.temp}°C</p>
                                    <p>{localStorage.getItem("lenguaje") === "ES" ? "Humedad:" : "Humidity:"} {weather.main.humidity}%</p>
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <h2 style={{textAlign: "left", marginLeft: "280px", fontSize: "30px", fontWeight: "bold"}}>{localStorage.getItem("lenguaje") === "ES" ? "Descubre tu nuevo alojamiento favorito" : "Find and book your perfect stay"}</h2>
            <Carousel/>

            <h2 style={{textAlign: "left", marginLeft: "280px", fontSize: "30px", fontWeight: "bold", marginTop:"50px"}}>{localStorage.getItem("lenguaje") === "ES" ? "Nuestros mejores servicios" : "Our best services"}</h2>
            <CarouselServicios/>
        </div>
    );
}

export default App;
