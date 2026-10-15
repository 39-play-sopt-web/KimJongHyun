import { useState } from 'react';
import style from './GameBoard.module.css';

// usestate: 숫자 배열 기억
// setNumbers: 숫자 배열 변경할 때 사용

// 처음에 나올 숫자 1~9 
const GameBoard = () => {
  const [numbers, setNumbers] = useState(() =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
  );

  // 나중에 나올 숫자 : 10~18
  const [remainingNumbers,setRemainingNumbers] = useState(() =>
    [10, 11, 12, 13, 14, 15, 16, 17, 18].sort(
      () => Math.random() - 0.5
    )
  );

// nextNumber = 지금 눌러야 하는 정답 숫자
  const [nextNumber, setNextNumber] = useState(1);

  const handleClick = (number) => {
  if (number === nextNumber) {
    const newNumbers = numbers.map((num) => {
      if (num === number) {

        if (num > 9){
          return null;  
        }
        return remainingNumbers[number - 1];
      }

      return num;
    });


    // 오류 디버깅
    // console.log('게임판 배열:', newNumbers, '길이:', newNumbers.length);
    setNumbers(newNumbers);
    setNextNumber(nextNumber + 1);

    if (number === 18){
      // 게임 종료 알림
      alert('게임 종료!');


      // 종료 > 재시작 (숫자 관련 setter 3개 호출)
      setNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5));

      setRemainingNumbers(
        [10, 11, 12, 13, 14, 15, 16, 17, 18].sort(() => Math.random() - 0.5)
      );

      setNextNumber(1);
    }
  }
};

  return (
    <div>
      <h2>다음 숫자: {nextNumber}</h2>

      <div className={style.board}>
        {/* map: 배열의 각 숫자들을 버튼으로 변환 */}
        {/* onclick:버튼을 클릭할때 */}
        {/* handleclick: 클릭한 버튼의 숫자를 함수에 전달 */}

        {numbers.map((number, index) => (
          <button
            key={index} 
            // 삼항 연산자
            className={number === null ? style.empty : ''}
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
