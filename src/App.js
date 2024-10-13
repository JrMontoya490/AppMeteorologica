import "./App.css";
import { useState } from "react";

const weatherApi = {
  key: "b0c0f8b1935c853e2f1d6d4e267e0f37",
  base: "https://api.openweathermap.org/data/2.5/",
};

const unsplashApi = {
  key: "Ai5nnt-rJX0p9HQwUKU30OGUNXFYiY_IY3id82HGWUM",
  base: "https://api.unsplash.com/search/photos",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState("");  // Para la imagen de fondo

  const searchPressed = () => {
    // Llamada a la API del clima
    fetch(`${weatherApi.base}weather?q=${search}&units=metric&APPID=${weatherApi.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        if (result.name) {
          fetchImage(result.name);  // Llamar a la API de Unsplash
        }
      });
  };

  const fetchImage = (city) => {
    fetch(`${unsplashApi.base}?query=${city}&client_id=${unsplashApi.key}&per_page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          setBackgroundImage(data.results[0].urls.regular);  // Configurar la imagen de fondo
        }
      });
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>  {/* Fondo dinámico */}
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Ingresar Ciudad...."
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={searchPressed} className="search-button">
            Buscar
          </button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p className="temp">{weather.main.temp}°C</p>
            <p className="condition">{weather.weather[0].main}</p>
            <p className="description">({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
