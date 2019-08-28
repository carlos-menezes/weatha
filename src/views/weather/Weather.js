import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { OWM_KEY, UNSPLASH_KEY } from '../../config';

import './Weather.css';

const Weather = ({ match }) => {

  const { location } = match.params;

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const [newLoc, setLocation] = useState('');
  
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  }
  
  const submitEnabled = newLoc.length > 0;

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      const OWM_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OWM_KEY}&units=metric`;
      const weatherApi = await axios.get(OWM_ENDPOINT);
      setCurrentWeatherData(weatherApi.data);
    }

    const fetchForecastData = async () => {
      const OWM_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${OWM_KEY}&units=metric`;
      const weatherApi = await axios.get(OWM_ENDPOINT);
      setForecastData(weatherApi.data);
    }

    fetchCurrentWeatherData();
    fetchForecastData();
  }, [location]);

  // style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%), url(https://picsum.photos/id/809/1920/1080?blur=10)` }}

  return (
    <React.Fragment>
      { 
        (currentWeatherData === null || forecastData === null) ? 
        <div className="app" >
          <div className="lds-dual-ring"></div>
        </div>  
        :
        <div className="app" style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0.8) 100%), url(https://picsum.photos/id/809/1920/1080?blur=10)` }}>
          <div className="weather">
            <form onSubmit={e => { e.preventDefault() }}>
              <input onChange={handleInputChange} autoComplete="false" spellCheck="false" placeholder="Enter a city name..." required d/>
                <Link to={`/weather/${newLoc}`}>
                  <button type="button" disabled={!submitEnabled}>></button>
                </Link>
            </form>
            <div className="weather-loc">
              <h1><span>{currentWeatherData.name}</span>, {currentWeatherData.sys.country} &middot; {new Date(currentWeatherData.dt * 1000).toLocaleDateString()}</h1>
            </div>
            <div className="weather-data">
              <div className="weather-temp">
                <div className="min">
                  <h1 title="Minimum Temperature">{Math.floor(currentWeatherData.main.temp_min)}</h1>
                  <h2>ºC</h2>
                </div>
                <div className="curr">
                  <h1 title="Current Temperature">{currentWeatherData.main.temp.toFixed(0)}</h1>
                  <h2>ºC</h2>
                </div>
                <div className="max">
                  <h1 title="Maximum Temperature">{Math.ceil(currentWeatherData.main.temp_max)}</h1>
                  <h2>ºC</h2>
                </div>
              </div>
              <div className="weather-stats">
                <div className="weather-stat">
                  <img src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt={currentWeatherData.weather[0].description} title="Weather"/>
                  <p>{currentWeatherData.weather[0].main}</p>
                </div>
                <div className="weather-stat">
                  <i className="fas fa-wind" title="Wind Speed"></i>
                  <p>{currentWeatherData.wind.speed}km/h</p>
                </div>
                <div className="weather-stat">
                  <i className="fas fa-tint" title="Humidity"></i>
                  <p>{currentWeatherData.main.humidity}%</p> 
                </div>
              </div>
            </div>
            <div className="forecast">
              { forecastData.list.filter((i) => i.dt_txt.split(' ')[1] === '00:00:00').map((w, i) => (
                      <div key={i} className="day">
                        <h1>{ ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][new Date(w.dt * 1000).getDay()] }</h1>
                        <div className="temp">
                          <img src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`} alt={w.weather[0].description} title="Weather"/>
                          <h1 title="Forecasted Temperature">{Math.floor(currentWeatherData.main.temp_min)} — {Math.ceil(currentWeatherData.main.temp_max)}</h1>
                          <h2>ºC</h2>
                        </div>
                      </div>
                    )) } 
            </div>
            <h2 className="powered-by">Powered by <a href="https://openweathermap.org">OpenWeatherMap</a> &middot; WITH <span style={{ color: 'red' }}>❤</span> by <a href="https://carlosmenezes.com">CARLOS MENEZES</a></h2>
          </div>
        </div>
    }
    </React.Fragment>
  )
}

export default Weather;