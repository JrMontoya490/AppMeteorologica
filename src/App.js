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

// Lista de ciudades
const cities = [
  "New York",
  "Paris",
  "London",
  "Tokyo",
  "Sydney",
  "Moscow",
  "Berlin",
  "Madrid",
  "Buenos Aires",
  "Toronto",
];

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState("");  // Para la imagen de fondo

  // Función para buscar el clima y la imagen de la ciudad ingresada
  const searchPressed = () => {
    fetch(`${weatherApi.base}weather?q=${search}&units=metric&APPID=${weatherApi.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        if (result.name) {
          fetchImage(result.name);
        }
      });
  };

  // Función para buscar el clima y la imagen de una ciudad aleatoria
  const searchRandomCity = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setSearch(randomCity);
    searchPressed(); 
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
            value={search}  // Mantener el valor de la ciudad seleccionada
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={searchPressed} className="search-button">
            Buscar
          </button>
        </div>

        <div>
          <button onClick={searchRandomCity} className="random-button">
            Ciudad Aleatoria
          </button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>  {/* Mostrar ciudad y país */}
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

