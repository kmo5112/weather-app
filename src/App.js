import React, { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const cities = ["Paris", "New york", "Tokyo", "Seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        setError("현재 위치를 가져올 수 없습니다.");
        setLoading(false);
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4421ffd25b0e2fa84d8bc2d370a60ba&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      setError("날씨 정보를 불러오는 중에 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    setLoading(true);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4421ffd25b0e2fa84d8bc2d370a60ba&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      setError("날씨 정보를 불러오는 중에 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (selectedCity) => {
    if (selectedCity === "current") {
      setCity("");
      getCurrentLocation();
    } else {
      setCity(selectedCity);
    }
  };

  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      setCity(searchCity);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <div className="container">
        {loading ? (
          <ClipLoader
            color="#2962ff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
          />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div>
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              setCity={city}
              handleCityChange={handleCityChange}
            />
            <div className="search-container">
              <input
                type="text"
                placeholder="도시를 검색하세요"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <button onClick={handleSearch}>검색</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;