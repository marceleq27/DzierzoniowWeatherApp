import React, { Component } from "react";
import styled from "styled-components";
import "../SearchBar/hamburgers.min.css";

const Hamburger = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  position: fixed;
  top: 3%;
  left: 7%;
  z-index: 100;
  background-color: #fff;
  &.hamburger {
    padding: 0;
  }
  span {
    span {
      &.hamburger-inner,
      &.hamburger-inner::after,
      &.hamburger-inner::before {
        background-color: #fff;
      }
    }
  }
`;

const StyledAside = styled.aside`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  &.active {
    opacity: 1;
    transform: scale(1.3);
  }
  form {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
      border: 2px solid #fff;
      padding: 10px;
      background-color: transparent;
      text-align: center;
      margin: 15px 0 0;
      border-radius: 30px;
      color: #fff;
    }
    button {
      padding: 10px 15px;
      background-color: transparent;
      border: 2px solid #fff;
      border-radius: 30px;
      font-family: "Crimson Pro", sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 15px;
      color: #fff;
    }
  }
`;

class SearchBar extends Component {
  state = {
    value: "Polska",
    visible: false
  };

  handleChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleMenu = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    });
    const aside = document.querySelector("aside");
    const hamburger = document.querySelector(".hamburger");
    aside.classList.toggle("active");
    hamburger.classList.toggle("is-active");
  };

  render() {
    const { value, visible } = this.state;
    return (
      <>
        <Hamburger
          onClick={this.handleMenu}
          className="hamburger hamburger--squeeze"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </Hamburger>
        <StyledAside
          className={visible ? "active" : ""}
          style={{
            transition: visible ? "0.4s" : "0.4s"
          }}
        >
          <form onSubmit={this.props.weather}>
            <input type="text" placeholder="Wpisz miasto.." name="city" />
            <input
              type="text"
              name="country"
              placeholder="Wpisz kraj..."
              value={value}
              onChange={this.handleChangeInput}
            />
            <button onClick={this.handleMenu}>Sprawdź pogodę!</button>
          </form>
        </StyledAside>
      </>
    );
  }
}

export default SearchBar;
