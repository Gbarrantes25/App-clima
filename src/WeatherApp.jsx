import React, { useState } from 'react'
import imagen from './assets/app-clima.png'

const API_KEY = "51fe76011943409ecade9e17caf2248b";
const diffKelvin = 273.15


export const WeatherApp = () => {

    const [ciudad, setCiudad] = useState("");
    const [dataWeather, setDataWeather] = useState(null)

    const handleCambioCiudad = ({ target }) => {
        const { value } = target;
        setCiudad(value.trimStart());
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) fethWeather(ciudad.trim());
        
    };



    const fethWeather = async (ciudad) => {

        try {
            // URL API = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
            const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
                                            ${ciudad}&appid=${API_KEY}`)).json();

            data.name ? setDataWeather(data) : setDataWeather(null)

        } catch (error) {
            setDataWeather(null)
        }

    }

    return (
        <div className='container'>

            <img className="img-app" src={imagen}></img>
            

            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    value={ciudad}
                    onChange={handleCambioCiudad}
                    placeholder='Escriba una ciudad'
                />

                <button type='submit'>
                    Buscar
                </button>

            </form>

            {dataWeather === null
                ? <div>
                    <h2>Ingrese ciudad</h2>
                </div>
                : <div>
                    <h1>{dataWeather.name} - {dataWeather.sys.country}</h1>
                    <h2>Temperatura: {parseInt(
                        (dataWeather.main.temp) - diffKelvin)} °C
                    </h2>
                    <p>Condición meteorológica: {dataWeather.weather[0]
                                    .description}
                    </p>
                    <img className="icon" 
                        src={`https://openweathermap.org/img/wn/${dataWeather
                        .weather[0].icon}@2x.png`}>    
                    </img>
                </div>
            }

        </div>
    )
}
