import styled from "styled-components";

export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 400px;
  width: 300px;
  background-color: #00FF38;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 18px;
  margin: 30px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ImgContainer = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px;
  height: 800%;
  width: 80%;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
`;
export const StyledImg = styled.img`
  display: flex;
  align-self: center;
  justify-self: center;
  margin: 24px;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 1);
  transition: all 0.3s ease-in-out; // Agrega una transición suave
  
  &:hover {
    transform: scale(1.1); // Agrandará la imagen en 1.3 veces
    filter: grayscale(100%);
    filter: opacity(1);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    font-weight: 400;
  }
`;
