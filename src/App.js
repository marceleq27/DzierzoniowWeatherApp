import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "../src/GlobalStyle";
import SearchBar from "./components/SearchBar/SearchBar";
import sun from "../src/assets/sunny.gif";
import lightstorm from "../src/assets/lightstorm.gif";

const APIddz =
  "https://api.openweathermap.org/data/2.5/weather?q=Dzierżoniów&APPID=fd0c7244de93ccf1ff991b24b2358a5a&units=metric";

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

const StyledDate = styled.div`
  background-color: #000;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: #fff;
    z-index: 15;
  }
`;

const StyledTime = styled(StyledDate)`
  p {
    bottom: 6%;
    color: #000;
    z-index: 5;
  }
`;

class App extends Component {
  state = {
    temp: "",
    mintemp: "",
    maxtemp: "",
    sunset: "",
    sunrise: "",
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
        let sunriseTime = new Date(
          data.sys.sunrise * 1000
        ).toLocaleTimeString();
        let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
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
          weather: data.weather[0].main,
          city: data.name,
          sunset: sunsetTime,
          sunrise: sunriseTime
        });
        this.setPicture();
      })
      .catch(err => console.log(err));
  }
  setPicture = () => {
    const picture = document.querySelector(".picture");
    if (this.state.weather === "Rain") {
      this.setState({
        appPicture: "Rain. Stay at home.."
      });
      picture.style.backgroundImage = "none";
      picture.style.backgroundColor = "#000";
    } else if (this.state.weather === "Lightstorm") {
      picture.style.backgroundImage = `url(${lightstorm})`;
      picture.style.backgroundColor = "transparent";
    }
  };
  getWeather = e => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=fd0c7244de93ccf1ff991b24b2358a5a&units=metric`
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
          let sunriseTime = new Date(
            response.sys.sunrise * 1000
          ).toLocaleTimeString();
          let sunsetTime = new Date(
            response.sys.sunset * 1000
          ).toLocaleTimeString();
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
            weather: response.weather[0].main,
            city: response.name,
            sunset: sunsetTime,
            sunrise: sunriseTime
          });
        }
        this.setPicture();
      })
      .catch(err => console.log(err));
  };
  render() {
    const {
      appPicture,
      weather,
      city,
      temp,
      mintemp,
      maxtemp,
      pressure,
      wind,
      time,
      date,
      sunset,
      sunrise
    } = this.state;

    return (
      <>
        <GlobalStyle />
        <SearchBar weather={this.getWeather} />
        <StyledMain>
          <StyledPicture className="picture" />
          <StyledP>{weather === "Rain" ? `${appPicture}` : ""}</StyledP>
          <StyledDiv>
            <h1>{city}</h1>
            <h2>{temp}&deg;C</h2>
            <h3>Dziś ciśnienie wynosi: {pressure}hPa</h3>
            <h3>Minimalna temperatura: {mintemp}&deg;C</h3>
            <h3>Maksymalna temperatura: {maxtemp}&deg;C</h3>
            <h3>Wiatr: {wind} km/h</h3>
            <StyledDate>
              <p>Godzina {time}</p>
              <p>{date}</p>
            </StyledDate>
            <StyledTime>
              <p>Wschód: {sunrise}</p>
              <p>Zachód: {sunset}</p>
            </StyledTime>
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
