import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import Hon from "../assets/project4.svg";
import { useState } from "react";
import HonImage from "./HonImage";
interface ManageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStore?: () => void;
}
const HonProject: React.FC<ManageModalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  const [isImageOpen, setIsImageOpen] = useState(false);
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Title>혼비니 시설 지도 사이트</Title>
        <Image src={Hon} />
        <TextWrapper>
          <Text>기간: 2025.1 ~ </Text>
          <Text>역할: 팀장, 프론트 팀장</Text>
          <Text>담당 페이지: 메인페이지 (전체 패널 및 지도) </Text>
          <Text>
            <a href="https://team1-web.vercel.app/">
              사이트 바로가기(더미데이터)
            </a>
          </Text>
          <Text>
            배운 점:
            <br />
            혼비니 프로젝트는 기술적으로 많이 공부할 수 있었던 프로젝트입니다.
            <br />
            그동안 사용해보고 싶었던 카카오 지도 API, Jotai, Emotion 등의
            라이브러리들을 적용하며 새로운 기술을 익힐 수 있었습니다. 하지만
            새로운 기술을 익히는 것보다 기존의 기술을 더 깉게 공부해야할
            필요성을 배운 프로젝트이기도 했습니다. 사용해보았습니다.
            <br />
            이번 프로젝트에서 프론트엔드 팀원 중 한 명이 리액트와 프로젝트
            경험이 처음이였기에 제가 먼저 깊이 공부한 뒤 팀원에게
            설명해야했습니다. 이를 위해 이전 프로젝트의 코드를 보며 복습했지만
            코드가 엉망이여서 제대로 정리할 필요가 있음을 알았습니다. 덕분에
            자가 코드 리뷰를 하며 기존 개념을 더 깊게 이해할 수 있는 계기가
            되었습니다.
            <br />
            다른 프로젝트에사 대충 공부하고 아는 척했다가 틀켰던 경험이 있었기에
            이번 팀원에게는 설명하기 전에 더 철저히 공부하는 습관을 들이게
            되었습니다. 더하여 모르는 것은 솔직하게 인정하고 함꼐 해결하는
            태도를 배웠습니다.
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
      {isImageOpen && <HonImage onClose={() => setIsImageOpen(false)} />}
    </Overlay>,
    modalRoot
  );
};
export default HonProject;
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
