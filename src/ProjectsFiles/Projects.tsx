import styled from "@emotion/styled";
import { useState } from "react";
import KeunProject from "./KeunProject";
import MUGOUProject from "./MUGOUProject";
import HonProject from "./HonProject";
interface ActivityProps {
  handleClick: (value: boolean) => void;
}
const Projects: React.FC<ActivityProps> = ({ handleClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  return (
    <>
      <Container>
        <Button
          onClick={() => {
            handleClick(false);
            window.dispatchEvent(new CustomEvent("activateChick"));
          }}
        >
          뒤로가기
        </Button>
        프로젝트
        <ActivityContainers>
          <ActivityContainer onClick={() => setIsModalOpen3(true)}>
            혼비니
            <Period>2025.1 ~</Period>
            <DetailButton>자세히 보기</DetailButton>
          </ActivityContainer>
          <ActivityContainer onClick={() => setIsModalOpen(true)}>
            큰소리 사이트
            <Period>2024.12~</Period>
            <DetailButton>자세히 보기</DetailButton>
          </ActivityContainer>
          <ActivityContainer onClick={() => setIsModalOpen(true)}>
            MUGOU
            <Period>2024.7 ~ 2024.8</Period>
            <DetailButton>자세히 보기</DetailButton>
          </ActivityContainer>
        </ActivityContainers>
      </Container>
      {isModalOpen && (
        <MUGOUProject
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen2 && (
        <KeunProject
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
        />
      )}
      {isModalOpen3 && (
        <HonProject
          isOpen={isModalOpen3}
          onClose={() => setIsModalOpen3(false)}
        />
      )}
    </>
  );
};
export default Projects;
const Button = styled.button`
  position: absolute;
  top: 5%;
  left: 20%;
  font-size: 25px;
  font-weight: 700;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    color: rgb(165, 165, 165);
  }
`;
const DetailButton = styled.button`
  font-size: 20px;
  font-weight: 700;
  opacity: 0;
  position: absolute;
  bottom: 35%;
  right: 50%;
  transform: translateX(50%);
  transition: opacity 0.5s ease-in-out;
  &:hover {
    color: rgb(165, 165, 165);
    border: none;
  }
`;
const Period = styled.div`
  font-size: 25px;
  margin-top: 10px;
`;
const ActivityContainers = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;
const ActivityContainer = styled.div`
  position: relative;
  text-align: center;
  font-size: 30px;
  width: 40%;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  white-space: nowrap;
  height: 100px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    width: 42%;
    padding: 30px;
    color: transparent;
  }
  &:hover button {
    opacity: 1;
  }
  transition: all 0.5s ease-in-out;
`;
const Container = styled.div`
  @font-face {
    font-family: "Hakgyoansim";
    src: url("/fonts/Hakgyoansim Nadeuri TTF B.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  overflow: hidden;
  font-family: "Hakgyoansim";
  position: absolute;
  font-size: 40px;
  padding: 20px;
  top: 10%;
  position: absolute;
  left: 10%;
  width: 500px;
`;
