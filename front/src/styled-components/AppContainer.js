import styled from "styled-components";
import img from "../assets/background.png"

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: start;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Add this line to make the background image fixed */
`;