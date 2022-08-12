import {WiDegrees} from "weather-icons-react";
import React from "react";

function WeatherInNextHours({icon,time,temp}) {
  return(
    <div className="flex flex-col">
      <span className="text-center">{time}</span>
      {icon}
      <div className="text-center flex justify-center relative">
        <span className={"leading-10 relative"}>{temp}</span>
        <WiDegrees size={40} className={"absolute left-3"}/>
      </div>

    </div>)
}

export default WeatherInNextHours