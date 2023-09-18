import React, { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {

    // 여러 도시의 날씨 불러오기
    // 선택한 도시가 정보가 뜰 수 있도록 실시간으로 변화하는 날씨를 담을 수 있는
    // useState를 호출하고 초기 값은 null로 지정((도시를 선택하지 않았을때는 현재 위치의 날씨가 뜨기위함))
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState(""); // 추가: 검색할 도시를 저장할 상태 추가
  const cities = ["Paris", "New york", "Tokyo", "Seoul"];
  
  // 현재 위치 불러오기
  // Geolocation API는 사용자의 현재 위치를 가져오는 API로 getCurrentPosition()매서드를 통해 사용자의 위치를 가져온다. 날씨 api를 불러오기 위해선 경도와 위도 정보가 필요하여 변수 lat과 lon을 생성
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      console.log("현재 위치?", lat, lon);

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 현재 위치의 날씨 불러오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4421ffd25b0e2fa84d8bc2d370a60ba&units=metric`;
    let response = await fetch(url);
    setLoading(true);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    console.log("현재날씨는?", data);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4421ffd25b0e2fa84d8bc2d370a60ba&units=metric`;
    let response = await fetch(url);
    setLoading(true);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  // WeatherButton컴포넌트 코드를 보면 Current Location버튼에 클릭이벤트를 줌
  // handleCityChange매서드를 생성하여 city가 "current"일때 setCity를 초기값으로 만들어 getCurrentLoation()매서드를 불러오게 하였다
  // 사용자가 Current Location을 눌렀을때 클릭이벤트로 handleCityChange에 "current"을 보내주어 현재위치와 그 곳의 날씨 정보를 불러오게됨
  const handleCityChange = (selectedCity) => {
    if (selectedCity === "current") {
      setCity("");
      getCurrentLocation();
    } else {
      setCity(selectedCity);
    }
  };

  // 추가: 검색 버튼을 클릭했을 때 검색한 도시의 날씨 정보를 가져오는 함수
  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      setCity(searchCity);
    }
  };

  // if문을 사용하여 city가 비어있을 시 현재위치호출매서드인 getCurrentLoation()를 호출하고 
// 그렇지않다면(사용자가 city를 선택했을 시) 선택한 도시의 날씨 api를 가져오는 매서드인 getWeatherByCity()를 호출한다.
  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#2962ff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather}></WeatherBox>
          <WeatherButton
            cities={cities}
            setCity={city}
            handleCityChange={handleCityChange}
          ></WeatherButton>
          {/* 추가: 검색 기능 */}
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
  );
}

export default App;
