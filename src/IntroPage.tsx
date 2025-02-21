import React, { useEffect, useState } from "react";
import FlyChick from "./FlyChick.tsx";
import styled from "@emotion/styled";

interface IntroPageProps {
  onComplete: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);
  if (!visible) return null;
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "0",
            width: "100%",
            height: "100px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Title>주희 작업 공간 대환영</Title>
        </div>
        <FlyChick />
      </div>
    </>
  );
};
export default IntroPage;

const Title = styled.h1`
  @font-face {
    font-family: "Hakgyoansim";
    src: url("/fonts/Hakgyoansim Nadeuri TTF B.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "Hakgyoansim";
  font-size: 50px;
`;
