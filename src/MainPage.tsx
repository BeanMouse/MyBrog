import { useState } from "react";
import ChickModel from "./ChickModel";
import styled from "@emotion/styled";
import Projects from "./Projects.tsx";

const MainPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <Wrapper>
        {!isClicked && (
          <Nav onClick={() => setIsClicked(!isClicked)}>프로젝트</Nav>
        )}
        {isClicked && (
          <>
            <Projects />
            <Button onClick={() => setIsClicked(false)}>X</Button>
          </>
        )}
        <ChickModel />
      </Wrapper>
    </>
  );
};
export default MainPage;
const Button = styled.button`
  position: absolute;
  top: 40%;
  right: 48%;
  font-size: 20px;
  font-weight: 700;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
`;
const Nav = styled.div`
@font-face {
    font-family: "Hakgyoansim";
    src: url("/fonts/Hakgyoansim Nadeuri TTF B.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "Hakgyoansim";
  position: absolute;
  font-size: 50px;
  top: 30%;
  left: 20%;
  :hover {
    color:rgb(255, 217, 0);
`;
const Wrapper = styled.div`
  positio: relative;
`;
