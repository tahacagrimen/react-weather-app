import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import "./Weather.css";

function Weather({
  latitude,
  longitude,
  setLongitude,
  setLatitude,
  setCity,
  city,
}) {
  const weeklist = useContext(WeatherContext);
  const [weather, setWeather] = useState(null);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setIsAllowed(true);
    });
    fetch(
      `https://eu1.locationiq.com/v1/reverse?key=pk.abd0d010708f4a1eae629ab631032fbe&lat=${latitude}&lon=${longitude}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data.address.city);
      });
  }, [isAllowed]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=7aff406c731cdcb4010f9219e8f01864`
    )
      .then((res) => res.json())
      .then((data) => setWeather([...data.daily]));
  }, [latitude]);

  if (weather === null) {
    return <div>Select a city above</div>;
  }

  let indexZero = false;

  return (
    <div className="weather-container flex items-center justify-center flex-col w-full">
      <h3 className="mt-2 mb-2 font-bold text-2xl">{city}</h3>
      <div className="weather-card w-full">
        {weeklist.map((day, index) => (
          <div
            key={index === "0" ? (indexZero = true) : index}
            className={`weather-card-day w-full h-64 flex items-center justify-between flex-col p-4 border-2 border-slate-50 shadow-md rounded-2xl mr-1 first:bg-slate-300`}
          >
            <div className="weather-card-day-name font-semibold text-lg">
              {day}
            </div>
            <img
              className="w-3/4"
              src={`http://openweathermap.org/img/wn/${weather[index].weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
            <div className="weather-card-day-temp">
              <p className="">
                {weather[index].temp.max}
                <span className="font-semibold">°C</span>
              </p>
              <p>
                {weather[index].temp.min}
                <span className="font-semibold">°C</span>
              </p>
              <p className="capitalize font-medium">
                {weather[index].weather[0].description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
