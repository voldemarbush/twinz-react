import { FC } from 'react';
import Card from '../modules/Card';

import './desk.css';

interface DeskProps {
  deskState: Card[];
  handleClick: (index: number) => void;
  isGameOver: boolean;
}

const Desk: FC<DeskProps> = ({ deskState, handleClick, isGameOver }) => {
  return (
    <div className={`app__desk-container ${isGameOver ? 'closed' : ''}`}>
      {deskState.map((item, index) => (
        <div
          className={`app__desk-card ${
            item.state === 'turned' || item.state === 'found' ? 'turned' : ''
          }`}
          key={index + item.url}
          onClick={() => {
            if (item.state !== 'found' && item.state !== 'turned')
              handleClick(index);
          }}
        >
          <div className="app__desk-card_front">
            <img src={item.url} />
          </div>
          <div className="app__desk-card_back">
            <img src={'./assets/SVG/question-5238501.svg'} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desk;
