import styled from "styled-components";

const BlackBoxContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 250px;
`;

const MessageText = styled.p`
  margin: 0;
  color: white;
`;

const CloseButton = styled.button`
  color: gray;
  font-size: 12px;
  margin-top: 8px;
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const Message = ({ message, onClose }) => {
  return (
    <BlackBoxContainer>
      <MessageText>{message}</MessageText>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </BlackBoxContainer>
  );
};

export default Message;
