import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const [location, setLocation] = useState('');
  const [bgImage, setBgImage] = useState('');

  
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  }
  
  const submitEnabled = location.length > 0;

  const appStyle = {
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), url('http://unsplash.it/1920/1080')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    animation: 'fadeout 2s'
  }  
  
  return (
    <div className="app" style={appStyle}>
      <div className="home">
        <h1>WHAT'S THE WEATHER LIKE IN...</h1>
        <form onSubmit={e => { e.preventDefault() }}>
          <input onChange={handleInputChange} autoComplete="false" spellCheck="false" placeholder="Enter a city name..." required d/>
            <Link to={`/weather/${location}`}>
              <button type="button" disabled={!submitEnabled}>></button>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Home;