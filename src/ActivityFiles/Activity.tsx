import styled from "@emotion/styled";
import ActivityModal from "./ActivityModal";
import { useState } from "react";
import KeunModal from "./KeunModal";
interface ActivityProps {
  handleClick: (value: boolean) => void;
}
const Activity: React.FC<ActivityProps> = ({ handleClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
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
        활동
        <ActivityContainers>
          <ActivityContainer onClick={() => setIsModalOpen2(true)}>
            큰소리 밴드부
            <Period>2023.3 ~ 2024.12</Period>
          </ActivityContainer>
          <ActivityContainer onClick={() => setIsModalOpen(true)}>
            GDSC 임원진
            <Period>2024.2 ~ 2025.2</Period>
          </ActivityContainer>
        </ActivityContainers>
      </Container>
      {isModalOpen && (
        <ActivityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen2 && (
        <KeunModal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
        />
      )}
    </>
  );
};
export default Activity;
const Button = styled.button`
  position: absolute;
  top: 7%;
  left: 12%;
  font-size: 25px;
  font-weight: 700;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
  :hover {
    color: rgb(165, 165, 165);
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
  text-align: center;
  font-size: 30px;
  width: 40%;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  white-space: nowrap;
  height: 100px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    width: 42%;
    padding: 30px;
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
  top: 20%;
  position: absolute;
  left: 10%;
  width: 500px;
`;
