import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import Keun from "../assets/project3.svg";
interface ManageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStore?: () => void;
}
const KeunModal: React.FC<ManageModalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Title>큰소리 밴드학회 사이트</Title>
        <Image src={Keun} />
        <Text>2024.12 ~</Text>
        <Text>역할: 프론트 팀장</Text>
        <Text>담당 페이지</Text>
        <a href="https://www.youtube.com/watch?v=CwV1eiPDgDk">무대 보러가기</a>
        <Button onClick={onClose}>닫기</Button>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
export default KeunModal;
const Image = styled.img`
  width: 100px;
  height: 100px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Text = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 10px;
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
  font-size: 15px;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
`;
