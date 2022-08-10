import {WiDaySunny, WiCloudy, WiDayRain, WiDayShowers, WiDayThunderstorm, WiDegrees} from "weather-icons-react";

function WeekWeather({date, temp, main, feelsLike}) {
  function renderSwitch(){
    let setSize= 40;
    switch(main){
      case 'Clear':
        return <WiDaySunny size={setSize}/>
      case 'Clouds':
        return <WiCloudy size={setSize}/>
      case 'Rain':
        return <WiDayRain size={setSize}/>
      case 'Drizzle':
        return <WiDayShowers size={setSize}/>
      case 'Thunderstorm':
        return <WiDayThunderstorm size={setSize}/>
      default:
        return <WiDaySunny size={setSize}/>
    }
  }
  return (
    <div className={"bg-slate-200 flex flex-col justify-center content-center m-2 rounded-xl flex-grow"}>
      <h1 className={"text-center"}>{date}</h1>
      <div className={"flex justify-center"}>
        {renderSwitch()}
        <span>{temp}</span>
        <WiDegrees size={30} className="inline"/>
        <span>{feelsLike}</span>
        <WiDegrees size={30} className="inline"/>
      </div>
      <h1 className={"text-center"}>{main}</h1>
    </div>
  );
}

export default WeekWeather;