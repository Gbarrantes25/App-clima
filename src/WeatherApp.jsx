import React, { useEffect, useState } from 'react'
import imagen from './assets/app-clima.png'

const API_KEY = "51fe76011943409ecade9e17caf2248b";
const diffKelvin = 273.15;


export const WeatherApp = () => {

    const [ciudad, setCiudad] = useState("");
    const [dataWeather, setDataWeather] = useState(null);
    const [pais, setPais] = useState("")

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

    const fetchCountry = async () => {
        try {
            const data = await (await fetch(`https://restcountries.com/v3.1/alpha/${dataWeather.sys.country}`)).json();
            setPais(data[0].name.common);


        } catch (error) {
            setPais(null);
        }

    }

    useEffect(() => {
        fetchCountry();
        weatherIcon();
        flagIcon();
    }, [dataWeather]);

    // <img src={`https://flagcdn.com/48x36/${(dataWeather.sys.country).toLowerCase()}.png`}></img>

    const weatherIcon = () => {
        let value = ""
        if (dataWeather === null) {
            return value
        } else {
            return value = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@4x.png`
        }
    }

    const flagIcon = () => {
        let value = ""
        if (dataWeather === null) {
            return value
        } else {
            return value = `https://flagcdn.com/48x36/${(dataWeather.sys.country).toLowerCase()}.png`
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

                <button type='submit' className='fw-bold'>
                    Buscar
                </button>

            </form>


            {dataWeather === null
                ? <div>
                    <h2 className='fw-bold'>Ingrese ciudad</h2>
                </div>
                : <div className="card mb-3 bg-primary text-white" style={{ maxWidth: "540px", margin: "auto" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={weatherIcon()} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className='fw-bold'>Temperatura: {parseInt(
                                    (dataWeather.main.temp) - diffKelvin)} °C
                                </h3>
                                <h6 className="card-title">{dataWeather.name} - {pais}</h6>
                                <img src={flagIcon()} className="img-fluid rounded-start" alt="..." style={{ margin: "1rem 0 2rem 0" }} />
                                <p className="card-text">Condición meteorológica: {dataWeather.weather[0]
                                    .description}</p>
                            </div>
                        </div>
                    </div>
                </div>


            }
        </div>
    )
}
