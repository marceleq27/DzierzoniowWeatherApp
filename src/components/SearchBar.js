import React, { Component } from "react";
import styled from "styled-components";

const Hamburger = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #000;
  position: fixed;
  top: 3%;
  left: 5%;
  z-index: 100;
  div {
    background-color: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    button {
      background-color: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
    }
  }
`;

const StyledAside = styled.aside`
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  position: fixed;
  top: 0;
  left: 0;
  form {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
      border: 2px solid black;
      padding: 10px;
      background-color: transparent;
      text-align: center;
      margin: 15px 0;
      border-radius: 30px;
    }
    button {
      padding: 10px 15px;
      background-color: transparent;
      border: 2px solid black;
      border-radius: 30px;
      font-family: "Crimson Pro", sans-serif;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

class SearchBar extends Component {
  state = {
    value: "Polska",
    visible: "true"
  };
  handleChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleMenu = e => {};
  render() {
    const { value } = this.state;
    return (
      <>
        <Hamburger>
          <div>
            <button onClick={this.handleMenu} />
          </div>
        </Hamburger>
        <StyledAside>
          <form onSubmit={this.props.weather}>
            <input type="text" placeholder="Wpisz miasto.." name="city" />
            <input
              type="text"
              name="country"
              placeholder="Wpisz kraj..."
              value={value}
              onChange={this.handleChangeInput}
            />
            <button>Sprawdź pogodę!</button>
          </form>
        </StyledAside>
      </>
    );
  }
}

export default SearchBar;
