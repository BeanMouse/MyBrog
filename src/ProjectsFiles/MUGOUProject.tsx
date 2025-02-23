import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import MUGOU from "../assets/project1.svg";
import { useState } from "react";
import MUGOUImage from "./MUGOUImages";
interface ManageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStore?: () => void;
}
const MUGOUModal: React.FC<ManageModalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  const [isImageOpen, setIsImageOpen] = useState(false);
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Title>MUGOU 맛집 탐색 사이트</Title>
        <Image src={MUGOU} />
        <TextWrapper>
          <Text>기간: 2024.7 ~ 2024.8</Text>
          <Text>역할: 프론트, 스크럼 마스터</Text>
          <Text>담당 페이지: 로그인 및 친구 관련 페이지</Text>
          <Text>
            <a href="https://mgu-yulliy-web.vercel.app/login">
              사이트 바로가기(여기는 서버가 닫혀서 사용불가)
            </a>
          </Text>
          <Text>
            배운 점:
            <br />
            머거유 프로젝트는 협업 자체를 처음 배운 점에서 의미가 가장 큰
            프로젝트입니다.
            <br />이 프로젝트는 프론트엔드로서의 첫 시작이었기에 JSX 문법부터
            React 사용법까지 모든 것이 새로웠고 배운 것 또한 가장 많았습니다.
            하지만 이러한 기술적인 성장보다도 협업 경험 자체에서 더 많은 것을
            배웠다고 생각합니다.
            <br />
            원활한 협업을 위한 커밋린트, 프리커밋등의 세팅 방법을 익혔고,
            디렉토리 및 컴포넌트 설계도 배울 수 있었습니다. 하지만 가장 인상
            깊었던 부분은 팀장님의 리더십입니다.
            <br />
            팀장님은 절대 화를 내지 않으셨습니다. 그리고 항상 팀원들의 의견을
            존중하며 프로젝트에 애정과 책임감을 넣어주기 위해 역할도 하나씩
            부여해주셨습니다. 프로젝트가 끝나고 팀장님께서는 "너가 나중에 팀장을
            하게 되었을 때 너도 이렇게 프로젝트를 처음했을 때가 있다는 걸
            기억하고 절대 화를 내서는 안돼"라고 하셧습니다. 이 말은 지금도 제
            프로젝트 진행 방식에 큰 영향을 주고 있습니다.
            <br />이 프로젝트를 통해 협업과 리더십의 중요성을 몸소
            경험하였습니다.
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
      {isImageOpen && <MUGOUImage onClose={() => setIsImageOpen(false)} />}
    </Overlay>,
    modalRoot
  );
};
export default MUGOUModal;
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
  margin: 20px;
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
