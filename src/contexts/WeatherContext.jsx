import React, { createContext } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  function myDate() {
    let a = new Date();
    let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    let r = weekdays[a.getDay()];
    let indexR = weekdays.indexOf(r);
    let newArr = [
      r,
      ...weekdays.slice(indexR + 1),
      ...weekdays.slice(0, indexR),
      r,
    ];
    return newArr;
  }

  const weeklist = myDate();

  return (
    <WeatherContext.Provider value={weeklist}>
      {props.children}
    </WeatherContext.Provider>
  );
};
