import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import Keun from "../assets/project3.svg";
import { useState } from "react";
import KeunImage from "./KeunImage";
interface ManageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStore?: () => void;
}
const KeunModal: React.FC<ManageModalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  const [isImageOpen, setIsImageOpen] = useState(false);
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Title>큰소리 밴드학회 사이트</Title>
        <Image src={Keun} />
        <TextWrapper>
          <Text>기간: 2024.12 ~</Text>
          <Text>역할: 프론트 팀장</Text>
          <Text>담당 페이지: 예약 관련 및 메인 페이지</Text>
          <Text>
            <a href="https://keunsori.com">
              사이트 바로가기(아쉽게도 학회원만 가능...)
            </a>
          </Text>
          <Text>
            배운 점:
            <br />
            기술적으로도 많이 발전한 프로젝트지만 팀장 역할의 중요성을 다시금
            깨달은 프로젝트였습니다.
            <br /> 팀을 이끌어 나가기 위해서는 팀원들의 성향과 상황을 계속해서
            파악하는 것이 중요했습니다. 초반에는 팀원들이 원하는 역할을
            들어주었지만, 프로젝트가 진행될수록 적합한 역할을 배분하는 것이 더
            중요하다는 것을 깨달았습니다.
            <br />
            예를 들어 기능 및 보안에 관심이 있는 팀원에게는 로그인 및 회원관리
            페이지를 맡겼고, 늦게 합류한 팀원에게는 팀 내 적응을 돕기 위해
            난이도가 높지는 않지만 백엔드와 협업이 많은 마이페이지를 담당하도록
            했습니다. 그리고 손이 빠르고 디자인에 관심이 많았던 저는 메인
            페이지를 맡았습니다.
            <br />
            이러한 효율적인 역할 배정의 핵심은 꾸준한 소통이라는 것을 깨달은 후
            매주 2시간씩 프론트 회의를 진행하여 팀원들의 일정 및 관심사를
            파악하려 하였고 초반에는 가벼운 일상 공유를 통해 어떤 환경에서
            일하고 있는지 이해하려 노력했습니다.
            <br />
            이러한 경험을 통해 팀장은 단순한 관리자가 아니라 팀원들의 강점을
            살려 프로젝트 진행을 원활히 해야하는 역할이라는 것을 깨달았습니다.
          </Text>
        </TextWrapper>
        <ImageLink
          onClick={(e) => {
            setIsImageOpen(true), e.stopPropagation();
          }}
        >
          페이지 사진 보기
        </ImageLink>
        <Button onClick={onClose}>닫기</Button>
      </ModalWrapper>
      {isImageOpen && <KeunImage onClose={() => setIsImageOpen(false)} />}
    </Overlay>,
    modalRoot
  );
};
export default KeunModal;
const ImageLink = styled.button`
  padding: 5px;
  cursor: pointer;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  height: 80%;
  overflow-y: auto;
  padding: 10px;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 5px;
  line-height: 1.8;
  padding-left: 10px;
`;
const Overlay = styled.div`
  @font-face {
    font-family: "IM_Hyemin";
    src: url("/fonts/IM_Hyemin-Bold.otf") format("opentype");
    font-weight: 700;
    font-style: normal;
  }
  overflow: hidden;
  font-family: "IM_Hyemin";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 30px 10px;
  border-radius: 10px;
  max-width: 600px;
  height: 85%;
  width: 60%;
`;
const Button = styled.button`
  cursor: pointer;
  width: 50%;
  font-size: 15px;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
`;
