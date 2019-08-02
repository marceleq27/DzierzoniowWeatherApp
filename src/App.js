import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "../src/GlobalStyle";
import SearchBar from "../src/components/SearchBar";
import sun from "../src/assets/sunny.gif";
import lightstorm from "../src/assets/lightstorm.gif";

const APIddz =
  "http://api.openweathermap.org/data/2.5/weather?q=Dzierżoniów&APPID=fd0c7244de93ccf1ff991b24b2358a5a&units=metric";

const StyledMain = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const StyledPicture = styled.picture`
  flex-basis: 40%;
  background-image: url(${sun});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  color: #fff;
  text-align: center;
`;

const StyledDiv = styled.div`
  flex-basis: 60%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  h1 {
    text-align: center;
    font-weight: 300;
  }
  h2 {
    font-size: 60px;
    text-align: center;
    padding: 25px 0;
    font-weight: 400;
  }
  h3 {
    font-size: 15px;
    text-align: center;
    padding: 5px 0;
    font-weight: 400;
  }
  p {
    position: absolute;
    bottom: 3%;
    left: 5%;
  }
  p:nth-of-type(2) {
    right: 5%;
    left: initial;
  }
`;

const StyledP = styled.p`
  position: absolute;
  left: 50%;
  top: 20%;
  font-family: "Crimson Pro", sans-serif;
  font-weight: 700;
  font-size: 25px;
  width: 100%;
  text-align: center;
  color: #fff;
  z-index: 50;
  transform: translateX(-50%);
`;

class App extends Component {
  state = {
    temp: "",
    mintemp: "",
    maxtemp: "",
    sunrise: "",
    sunset: "",
    time: "",
    wind: "",
    pressure: "",
    date: "",
    weather: "",
    err: "",
    appPicture: "",
    city: ""
  };
  componentWillMount() {
    fetch(APIddz)
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(data => {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        const date = new Date().toLocaleDateString();
        this.setState({
          err: false,
          temp: Math.ceil(data.main.temp),
          time: `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }`,
          pressure: data.main.pressure,
          mintemp: Math.ceil(data.main.temp_min),
          maxtemp: Math.ceil(data.main.temp_max),
          wind: data.wind.speed,
          date: date,
          weather: data.weather.main,
          city: data.name
        });
      })

      .catch(err => console.log(err));
  }
  componentDidMount() {
    switch (this.state.weather) {
      case "Rain":
        this.setState({
          appPicture: "Rain. Stay at home.."
        });
        break;
      case "Lightstorm":
        this.setState({
          appPicture: `${lightstorm}`
        });
        break;
      default:
        this.setState({
          appPicture: `${sun}`
        });
    }
  }
  getWeather = e => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=fd0c7244de93ccf1ff991b24b2358a5a&units=metric`
    )
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(response => {
        if (city && country) {
          let hours = new Date().getHours();
          let minutes = new Date().getMinutes();
          const date = new Date().toLocaleDateString();
          this.setState({
            temp: Math.ceil(response.main.temp),
            time: `${hours < 10 ? `0${hours}` : hours}:${
              minutes < 10 ? `0${minutes}` : minutes
            }`,
            pressure: response.main.pressure,
            mintemp: Math.ceil(response.main.temp_min),
            maxtemp: Math.ceil(response.main.temp_max),
            wind: response.wind.speed,
            date: date,
            weather: response.weather.main,
            city: response.name
          });
        }
      });
  };
  render() {
    const { appPicture, weather } = this.state;

    return (
      <>
        <GlobalStyle />
        <SearchBar weather={this.getWeather} />
        <StyledMain>
          <StyledPicture
            style={{
              backgroundImage:
                appPicture === "Rain" ? "none" : `url(${appPicture})`,
              backgroundColor: appPicture === "Rain" ? "#000" : "none"
            }}
          />
          <StyledP>{weather === "Rain" ? `${appPicture}` : ""}</StyledP>
          <StyledDiv>
            <h1>{this.state.city}</h1>
            <h2>{this.state.temp}&deg;C</h2>
            <h3>Dziś ciśnienie wynosi: {this.state.pressure}hPa</h3>
            <h3>Minimalna temperatura: {this.state.mintemp}&deg;C</h3>
            <h3>Maksymalna temperatura: {this.state.maxtemp}&deg;C</h3>
            <h3>Wiatr: {this.state.wind} km/h</h3>
            <p>Godzina {this.state.time}</p>
            <p>{this.state.date}</p>
          </StyledDiv>
        </StyledMain>
        {console.log(
          "Awesome weather gifs were created by: https://dribbble.com/OsborneBranding"
        )}
      </>
    );
  }
}

export default App;
