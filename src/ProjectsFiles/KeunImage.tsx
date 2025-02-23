import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import reserv1 from "../assets/Keun/reserv1.svg";
import reserv2 from "../assets/Keun/reserv2.svg";
import reserv3 from "../assets/Keun/reserv3.svg";
import reserv4 from "../assets/Keun/reserv4.svg";
import reserv5 from "../assets/Keun/reserv5.svg";
interface ManageModalProps {
  onClose?: () => void;
}
const KeunImage: React.FC<ManageModalProps> = ({ onClose }) => {
  const imageList: string[] = [reserv1, reserv4, reserv5, reserv2, reserv3];
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <Images>
          {imageList.map((image, index) => (
            <>
              <ProjectsImage key={index} src={image} />
            </>
          ))}
        </Images>
        <Button onClick={onClose}>닫기</Button>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};

export default KeunImage;
const Images = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProjectsImage = styled.img`
  width: 90%;
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
  max-width: 800px;
  width: 80%;
  height: 80%;
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
