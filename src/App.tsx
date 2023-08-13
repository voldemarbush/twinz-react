import { FC, useState, useEffect } from 'react';
import './App.css';

import cardListInit from './modules/cardListInit';
import Card from './modules/Card';
import Desk from './components/Desk';

const cardsShuffle = (array: Card[]) => {
  let index = array.length - 1;
  while (index >= 0) {
    const temp = array[index];
    const random = Math.floor(Math.random() * index);
    array[index] = array[random];
    array[random] = temp;
    index--;
  }
  return array;
};

const fullCopy = (array: Card[]): Card[] => {
  return array.map((item) => {
    const res: Card = { id: 0, url: '', state: '' };
    Object.assign(res, item);
    return res;
  });
};

const cardList: Card[] = cardsShuffle([
  ...cardListInit,
  ...fullCopy(cardListInit),
]);

const App: FC = () => {
  const [deskState, setDeskState] = useState<Card[]>(cardList);
  const [indexAcc, setIndexAcc] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [openCardsCounter, setOpenCardsCounter] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (openCardsCounter === 12) {
      setTimeout(() => {
        setIsGameOver(true);
        setDeskState(cardsShuffle(cardList));
        setCounter(0);
        setOpenCardsCounter(0);
        setIndexAcc([]);
      }, 2000);
      setTimeout(() => {
        setDeskState((prev) => {
          const newDeskState = fullCopy([...prev]);
          newDeskState.map((item) => {
            item.state = 'closed';
          });
          return newDeskState;
        });
      }, 1000);
    }
  }, [openCardsCounter]);

  useEffect(() => {
    const turnCard = (state: string): void => {
      setDeskState((prev) => {
        const newDeskState = fullCopy([...prev]);
        newDeskState[indexAcc[0]].state = state;
        newDeskState[indexAcc[1]].state = state;
        return newDeskState;
      });
    };
    if (counter % 2 !== 0 || counter < 2) return;
    if (deskState[indexAcc[0]].id === deskState[indexAcc[1]].id) {
      turnCard('found');
      setOpenCardsCounter(openCardsCounter + 1);
    } else {
      setTimeout(() => {
        turnCard('closed');
      }, 1000);
    }
  }, [counter]);

  const handleClick = (index: number): void => {
    setDeskState((prev) => {
      const newDeskState = fullCopy([...prev]);
      newDeskState[index].state = 'turned';
      setCounter(counter + 1);
      setIndexAcc([indexAcc[1], index]);
      return newDeskState;
    });
  };

  return (
    <div className="app__main">
      <p>{`Move number: ${counter}`}</p>
      <Desk
        deskState={deskState}
        handleClick={handleClick}
        isGameOver={isGameOver}
      />
    </div>
  );
};

export default App;
