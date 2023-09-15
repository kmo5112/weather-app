import logo from './logo.svg';
import {useEffect} from "react";
import {useState} from "react";
import WeatherButton from './component/WeatherButton';
import { ThreeDots } from "react-loader-spinner";




// 1. 앱이 실행되자마자(useEffect)유저는 현재 위치의 날씨를 볼 수 있다. (지역, 온도, 날씨 상태)
// 2. 유저는 다른 도시의 버튼을 볼 수 있다. (현재 도시, 4개 도시)
// 3. 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다.
// 4. 유저는 데이터가 로딩될때 로딩 스피너를 볼 수 있다.
// 5. 현재위치버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.

function App() {
  // App이 필요한 함수를 가지고 보내주기만함
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities=['paris', 'new york', 'tokyo', 'seoul']

  // 현재 위치불러오기
  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat,lon); //getWeatherByCurrentLocation함수호출시 lat,lon을 가져감
    });
  };


  // 현재 위치의 날씨 불러오기
  const getWeatherByCurrentLocation = async(lat,lon) =>{
    
    let url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=d4421ffd25b0e2fa84d8bc2d370a60ba`;
    let response = await fetch(url);
    setLoading(true); 
    let data = await response.json();  
    setWeather(data);
    setLoading(false);
    console.log("현재날씨는?", data);
  }

  const  getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4421ffd25b0e2fa84d8bc2d370a60ba`
    let response = await fetch(url);
    setLoading(true);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  } // 

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity('');
    } else {
      setCity(city);
    }
  }; // handleCityChange 메서드를 생성하여 city가 "current"일때 setCity를 초기값으로 만들어 getCurrentLoation() 메서드를 불러오게함. 

  
  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city])

  return (
    <>
      {visible ? (
        <div className="container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="lightblue"
            ariaLabel="three-dots-loading"
            visible={visible}
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
            selectedCity={city} 
          />
        </div>
      )}
    </>
  );
  
}


export default App;
