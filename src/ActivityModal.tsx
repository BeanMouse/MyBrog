import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import GDSC from "./assets/GDSC.svg";
interface ManageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStore?: () => void;
}
const ManageModal: React.FC<ManageModalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Title>GDSC 임원진 (코어 멤버)</Title>
        <Image src={GDSC} />
        <Text>2024.2 ~ 2025.2</Text>
        <Text>부서: DEVREL</Text>
        <Text>
          하는 일: 여러 여가 이벤트 기획
          <br />
          공강메이트, 만우절 이벤트 등을 진행
        </Text>
        <Text>이외: 코어멤버 세미나 참여</Text>
        <a href="https://www.youtube.com/watch?v=9dGXbJEISQA&t=109s">
          세미나 유튜브 바로가기
        </a>
        <Button onClick={onClose}>닫기</Button>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
export default ManageModal;
const Image = styled.img`
  width: 100px;
  height: 100px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
const Text = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 10px;
`;
const Overlay = styled.div`
  @font-face {
    font-family: "Hakgyoansim";
    src: url("/fonts/Hakgyoansim Nadeuri TTF B.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "Hakgyoansim";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 30px 10px;
  border-radius: 10px;
  max-width: 400px;
  width: 60%;
`;
const Button = styled.button`
  cursor: pointer;
  width: 50%;
  font-size: 20px;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
`;
