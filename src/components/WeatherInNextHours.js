function WeatherInNextHours({icon,time,temp}) {
  return(
    <div>
      <span>{time}</span>
      {icon}
      <span>{temp}</span>
    </div>)
}

export default WeatherInNextHours