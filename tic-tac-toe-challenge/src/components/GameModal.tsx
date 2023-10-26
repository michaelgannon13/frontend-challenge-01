import React from 'react';
import { useGame } from '../context/GameContext';
import { Modal, Button } from 'react-bootstrap';
import {ModalContentProps} from '../types'

const ModalContent: React.FC<ModalContentProps> = ({ title, message, buttonText, onButtonClick }) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h2>{message}</h2>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </Modal.Footer>
  </>
);

const GameModal: React.FC = () => {
  const { winner, resetGame, ultimateWinner, timeLeft } = useGame();

  if (!winner && timeLeft > 0) return null;

  const getModalContent = (): ModalContentProps => {
    if (ultimateWinner) {
      return {
        title: 'Championship Over',
        message: `${ultimateWinner} is the ultimate champion with 5 wins!`,
        buttonText: 'Restart Championship',
        onButtonClick: resetGame,
      };
    }
    if (winner) {
      return {
        title: 'Game Over',
        message: `${winner} wins!`,
        buttonText: 'Restart Game',
        onButtonClick: resetGame,
      };
    }
    if (timeLeft === 0) {
      return {
        title: 'Game Over',
        message: "Time's up!",
        buttonText: 'Restart Game',
        onButtonClick: resetGame,
      };
    }
    throw new Error("Unexpected game state"); // or return a default modal content if you prefer
  };

  const modalContent = getModalContent();

  return (
    <Modal show={true} onHide={resetGame}>
      <ModalContent {...modalContent} />
    </Modal>
  );
};

export default GameModal;