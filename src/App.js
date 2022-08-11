import './App.css';
import React from "react";

import {WiCelsius} from "weather-icons-react";

class App extends React.Component {
  state={
    city:'Poznan',
    date:'',
    chmury:'',
    temp:'',
    wiatr:'',
    feelsLike:'',
  }

  fetchWeather=()=>{
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=oborniki&exclude=daily&appid=0108d9940c3664c932faecc5a0ef2ab8&units=metric&lang=pl')
      .then(response => response.json())
      .then(json => {
        this.setState({
          main: json.list[0].weather[0].main,
          temp: json.list[0].main.temp,
          wiatr: json.list[0].wind.speed,
          feelsLike: json.list[0].main.feels_like,
        })})
  }

  getDayName(){
    const currentTime=new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const day = currentTime.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = currentTime.getMonth();

    this.setState({
      date: `${hours}:${minutes} - ${days[day]}, ${currentTime.getDate()} ${months[month]}`,
    })
  }


  // renderSwitch(){
  //   let setSize= 40;
  //   switch({
  //     case 'Clear':
  //       return <WiDaySunny size={setSize}/>
  //     case 'Clouds':
  //       return <WiCloudy size={setSize}/>
  //     case 'Rain':
  //       return <WiDayRain size={setSize}/>
  //     case 'Drizzle':
  //       return <WiDayShowers size={setSize}/>
  //     case 'Thunderstorm':
  //       return <WiDayThunderstorm size={setSize}/>
  //     default:
  //       return <WiDaySunny size={setSize}/>
  //   }}


  componentDidMount() {
    this.fetchWeather();
    this.getDayName();
  }

  render(){
    return(
      <section className={"h-screen flex text-white backgroundImg font-mono"}>
        <section className={"self-end w-2/3"}>
          <section className={"flex justify-center"}>
            <div>
              <span>{Math.round(this.state.temp)}</span>
              <WiCelsius size={30} className={"inline"}/>
            </div>
            <div>
              <h1>{this.state.city}</h1>
              <h1>{this.state.date}</h1>
            </div>
            <div>
              <h1>Ikona</h1>
              <h1>Jaka pogoda</h1>
            </div>
          </section>
          <section>
            <h1>Hourly forecast</h1>
            <section className={"flex"}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </section>
          </section>
        </section>
        <section className={"w-1/3"}>
          MIASTO I INNE
        </section>
      </section>

    )
  }
}

export default App;
