import { useState } from "react";
import ChickModel from "./ChickModel";
import styled from "@emotion/styled";
import Activity from "./Activity";

const MainPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <Wrapper>
        {!isClicked && (
          <>
            <Detail>클릭을 하면 날개가 움직여요!</Detail>
            <Nav
              isProject={true}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("activateChick"))
              }
            >
              프로젝트
            </Nav>
            <Nav
              onClick={() => {
                setIsClicked(true);
                window.dispatchEvent(new CustomEvent("activateChick"));
              }}
            >
              활동
            </Nav>
          </>
        )}
        {isClicked && (
          <>
            <Activity handleClick={setIsClicked} />
          </>
        )}
        <ChickModel />
      </Wrapper>
    </>
  );
};
export default MainPage;
const Detail = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  color: #505050;
  font-size: 30px;
  font-weight: 700;
  pointer-events: none;
`;

const Nav = styled.div<{ isProject?: boolean }>`
  position: absolute;
  font-size: 50px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
  top: 30%;
  left: ${(props) => (props.isProject ? "20%" : "40%")};
  :hover {
    color:rgb(255, 217, 0);
`;
const Wrapper = styled.div`
  position: relative;
  @font-face {
    font-family: "Hakgyoansim";
    src: url("/fonts/Hakgyoansim Nadeuri TTF B.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "Hakgyoansim";
  overflow: hidden;
`;
