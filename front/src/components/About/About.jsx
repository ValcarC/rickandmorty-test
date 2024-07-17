import React from "react";
import image from "../../assets/Victor.jpg";


import { AboutContainer, CardAboutContainer, AboutWapper, ImgContainer, Image, TextContainer } from "../../styled-components/About";
const About = () => {
  return (
    <AboutContainer >
      <CardAboutContainer >
        <AboutWapper >
          <ImgContainer>
            <Image src={image} alt="aboutImage" />
          </ImgContainer>
          <TextContainer>
            <h2>ABOUT ME</h2>
            <div>
              <p>
                RICK AND MORTY PRUEBA
                <br></br>
                <br />
                valcar.cortes@gmail.com
              </p>
            </div>
          </TextContainer>
        </AboutWapper>
      </CardAboutContainer>
    </AboutContainer>
  );
};

export default About;
