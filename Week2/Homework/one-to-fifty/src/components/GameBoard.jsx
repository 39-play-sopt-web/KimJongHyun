import { useState } from 'react';
import style from './GameBoard.module.css';

// usestate: 숫자 배열 기억
// setNumbers: 숫자 배열 변경할 때 사용
// 
const GameBoard = () => {
  const [numbers, setNumbers] = useState(() =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
  );


  const [nextNumber, setNextNumber] = useState(1);

  const handleClick = (number) => {
  if (number === nextNumber) {
    const newNumbers = numbers.map((num) => {
      if (num === number) {
        return 10;
      }

      return num;
    });

setNumbers(newNumbers);



    setNextNumber(nextNumber + 1);
  }
};

  return (
    <div>
      <h2>다음 숫자: {nextNumber}</h2>

      <div className={style.board}>
        {/* map: 배열의 각 숫자들을 버튼으로 변환 */}
        {/* onclick:버튼을 클릭할때 */}
        {/* handleclick: 클릭한 버튼의 숫자를 함수에 전달 */}
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
