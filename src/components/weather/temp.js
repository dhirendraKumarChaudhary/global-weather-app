import React, { useEffect, useState } from 'react'
import Weathercard from "./weathercard"
import "./style.css"

const Temp = () => {

    const [searchValue, setSearchValue] = useState('New Delhi')
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c322ab0e48aea1f027f1ef9ce8cd19c1`;
            let res = await fetch(url);
            let data = await res.json();

            const { temp, pressure, humidity } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { country, sunset } = data.sys;
            const { speed } = data.wind;

            const myNewWeatherInfo = {
                temp, 
                pressure,
                humidity,
                weathermood,
                name,
                country,
                sunset,
                speed,
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, []);
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input
                        type="search"
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button className='searchButton'
                        type='button'
                        onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>

            {/* temperature card */}
            <Weathercard {...tempInfo} />
        </>
    )
}

export default Temp;
