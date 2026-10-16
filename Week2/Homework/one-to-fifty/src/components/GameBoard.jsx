import { useState, useEffect, useRef } from "react";
import style from "./GameBoard.module.css";
import GameModal from "./GameModal";

// usestate: 숫자 배열 기억, 시간 기억
// useref: 게임 시작 시각을 기억
// setNumbers: 숫자 배열 변경할 때 사용
// 구조 분해 할당: 부모가 전달한 props 값 꺼내 씀

// 처음에 나올 숫자 1~9
const GameBoard = ({ gameTime, setGameTime }) => {
  const [numbers, setNumbers] = useState(() =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5),
  );

  // 나중에 나올 숫자 : 10~18
  const [remainingNumbers, setRemainingNumbers] = useState(() =>
    [10, 11, 12, 13, 14, 15, 16, 17, 18].sort(() => Math.random() - 0.5),
  );

  // nextNumber = 지금 눌러야 하는 정답 숫자
  const [nextNumber, setNextNumber] = useState(1);

  // 타이머 만들기
  // const [gameTime, setGameTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);

  // 게임 종료 모달
  const [showModal, setShowModal] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setGameTime((Date.now() - startTime.current) / 1000);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const startTime = useRef(null);

  // 게임 화면을 벗어나면 타이머 초기화
  useEffect(() => {
    return () => {
      setGameTime(0);
    };
  }, [setGameTime]);

  const handleClick = (number) => {
    if (number === nextNumber) {
      if (number === 1) {
        startTime.current = Date.now();
        setIsPlaying(true);
      }
      const newNumbers = numbers.map((num) => {
        if (num === number) {
          if (num > 9) {
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

      if (number === 18) {
        const resultTime = (Date.now() - startTime.current) / 1000;

        // 랭킹 구현 위해 JSON 개념 추가 (API쪽이라는데 잘 모르겠음 어려움)
        const records = JSON.parse(localStorage.getItem("gameRecords")) || [];

        records.push({
          time: Number(resultTime.toFixed(2)),
          level: 1,
          date: new Date().toLocaleString("ko-KR"),
        });

        localStorage.setItem("gameRecords", JSON.stringify(records));

        setIsPlaying(false);
        setGameTime(resultTime);

        // 게임 종료 알림
        // alert(`게임 종료! ${resultTime.toFixed(2)}초`); 주석 처리

        setFinalTime(resultTime);
        setShowModal(true);
      }
    }
  };

  // 게임 다시 시작하기
  const restartGame = () => {
    setNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5));

    setRemainingNumbers(
      [10, 11, 12, 13, 14, 15, 16, 17, 18].sort(() => Math.random() - 0.5),
    );

    setNextNumber(1);
    setGameTime(0);
    setIsPlaying(false);
    setShowModal(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-130px)] flex-col items-center bg-slate-50 pt-12">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">
        다음 숫자: {nextNumber}
        <span className="ml-2 text-lg font-normal text-gray-400">/ 18</span>
      </h2>
      {/* toFixed: 시간을 소수점 둘째까지 표시하는 메서드 */}
      {/* <p>게임 시간: {gameTime.toFixed(2)}초</p> */}

      <div className={`${style.board} mx-auto mt-6`}>
        {/* map: 배열의 각 숫자들을 버튼으로 변환 */}
        {/* onclick:버튼을 클릭할때 */}
        {/* handleclick: 클릭한 버튼의 숫자를 함수에 전달 */}

        {numbers.map((number, index) => (
          <button
            key={index}
            // 삼항 연산자 (tailwind 적용)
            className={`rounded-xl border border-gray-200 bg-white text-gray-900
              shadow-sm font-semibold
              hover:border-gray-400 hover:bg-gray-50
              active:scale-95 active:bg-gray-900 active:text-white
              transition-all duration-150   
              ${number === null ? style.empty : ""}`}
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        ))}
      </div>

      {showModal && <GameModal finalTime={finalTime} onRestart={restartGame} />}
    </div>
  );
};

export default GameBoard;
