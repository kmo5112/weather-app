import React from 'react'

const WeatherBox = ({weather}) => {
  console.log("weather?",weather)
  
  // 정수형태로 보이는 것이 좋을 것같다고 판단하여 삼항연산자를 이용해 weather의 main에 있는 temp(기온)값이 0초과할 때는 소수점을 잘라서 값을 반환할수있도록 Math.floor()함수를 이용하였다.
  return (
    <div className='weather-box'>
        <div>{weather && weather.name}</div> 
        
        <h2>{weather && `${weather.main.temp>0?Math.floor(weather.main.temp):weather.main.temp}`}°C</h2>
        <h3>{weather && weather.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox
