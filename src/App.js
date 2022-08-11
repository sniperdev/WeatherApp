import './App.css';
import React from "react";
import WeatherInNextHours from './components/WeatherInNextHours'

import {WiCelsius, WiCloudy, WiDayRain, WiDayShowers, WiDaySunny, WiDayThunderstorm} from "weather-icons-react";


class App extends React.Component {
  state={
    city:'Poznan',
    date:'',
    hours:'',
    main:'',
    temp:'',
    wiatr:'',
    feelsLike:'',
  }

  fetchWeather=()=>{
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=oborniki&exclude=daily&appid=0108d9940c3664c932faecc5a0ef2ab8&units=metric&lang=pl')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let tempArr=[];
        let mainArr=[];
        for(let i=0;i<7;i++){
          tempArr.push(Math.round(json.list[i].main.temp))
          mainArr.push(json.list[i].weather[0].main)
        }
        console.log(mainArr)

        console.log(tempArr);
        this.setState({
          main: mainArr,
          temp: tempArr,
          wiatr: json.list[0].wind.speed,
          feelsLike: json.list[0].main.feels_like,
        })})
  }

  getDayName(){
    const currentTime=new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    let hoursArr;
    hoursArr=[];
    for(let i=0;i<7;i++){
      if(hours+(i*3)>24){
        let zmienna = hours-24;
        hoursArr.push(((zmienna)+(3*i))<10 ? '0'+(zmienna+(3*i)):zmienna+(3*i))
      }
      else hoursArr.push(hours+(3*i))
    }
    const day = currentTime.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = currentTime.getMonth();

    this.setState({
      date: `${hours}:${minutes} - ${days[day]}, ${currentTime.getDate()} ${months[month]}`,
      hours: hoursArr,
    })
  }


  renderSwitch(main){
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
    }}


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
              {this.renderSwitch(this.state.main)}
              <h1>{this.state.main}</h1>
            </div>
          </section>
          <section>
            <h1>Hourly forecast</h1>
            <section className={"flex"}>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[0])} time={this.state.hours[0]} temp={this.state.temp[0]}/>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[1])} time={this.state.hours[1]} temp={this.state.temp[1]}/>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[2])} time={this.state.hours[2]} temp={this.state.temp[2]}/>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[3])} time={this.state.hours[3]} temp={this.state.temp[3]}/>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[4])} time={this.state.hours[4]} temp={this.state.temp[4]}/>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[5])} time={this.state.hours[5]} temp={this.state.temp[5]}/>
              <WeatherInNextHours icon={this.renderSwitch(this.state.main[6])} time={this.state.hours[6]} temp={this.state.temp[6]}/>
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
