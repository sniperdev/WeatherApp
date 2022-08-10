import './App.css';
import React from "react";

import { WiDaySunny } from "weather-icons-react";
import WeekWeather from "./components/WeekWeather";

class App extends React.Component {
  state={
    chmury:'',
    temp:'',
    wiatr:'',
    date:'',
    feelsLike:'',
  }
  fetchWeather=()=>{
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=oborniki&exclude=daily&appid=0108d9940c3664c932faecc5a0ef2ab8&units=metric&lang=pl')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const current=new Date();
        const date=`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        this.setState({
          main: json.list[0].weather[0].main,
          temp: json.list[0].main.temp,
          wiatr: json.list[0].wind.speed,
          date: date,
          feelsLike: json.list[0].main.feels_like,
        })})
  }
  componentDidMount() {
    this.fetchWeather();
  }

  render(){
    return(
      <section className={"w-screen h-screen grid grid-cols-3 grid-rows-2"}>
        <section className={"row-span-2"}>
          <div>
            <h1>Oborniki, PL</h1>
            <h2>{this.state.temp}</h2>
            <h3>{this.state.main}</h3>
            <h3>{this.state.date}</h3>
          </div>
          <div>
            <div className={'border-2 bg-neutral-100'}>
              <h1>{this.state.feelsLike}</h1>
              <WiDaySunny size={24} color='#000' />
              <h1>Feels like</h1>
            </div>
          </div>
        </section>
        <section className={"col-span-2 flex bg-neutral-300 rounded-xl"}>
          <WeekWeather date={"10/08/22"} temp={this.state.temp} feelsLike={this.state.feelsLike} main={this.state.main}/>
          <WeekWeather date={"10/08/22"} temp={this.state.temp} feelsLike={this.state.feelsLike} main={this.state.main}/>
          <WeekWeather date={"10/08/22"} temp={this.state.temp} feelsLike={this.state.feelsLike} main={this.state.main}/>
          <WeekWeather date={"10/08/22"} temp={this.state.temp} feelsLike={this.state.feelsLike} main={this.state.main}/>
        </section>
        <section className={"col-span-2"}></section>
      </section>
    )
  }
}

export default App;
