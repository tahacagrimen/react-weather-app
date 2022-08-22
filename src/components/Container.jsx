import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import { WeatherContext } from "../contexts/WeatherContext";

function Container() {
  const [cityList, setCityList] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState(null);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json"
    )
      .then((res) => res.json())
      .then((data) => setCityList(data));
  }, []);

  const handleCity = (e) => {
    setLatitude(cityList.find((city) => city.name === e.target.value).latitude);
    setLongitude(
      cityList.find((city) => city.name === e.target.value).longitude
    );
    setCity(e.target.value);
  };

  console.log(latitude, longitude);

  return (
    <div className="border-2  border-slate-50 p-4 shadow-xl rounded-3xl h-96">
      <form>
        <select className="" onChange={handleCity} name="cities" id="cities">
          <option value="">Select City</option>
          {cityList.map((city) => (
            <option
              key={city.id}
              lat={city.latitude}
              lot={city.longitude}
              value={city.name}
            >
              {city.name}
            </option>
          ))}
        </select>
      </form>
      <Weather
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCity={setCity}
        city={city}
      />
    </div>
  );
}

export default Container;
