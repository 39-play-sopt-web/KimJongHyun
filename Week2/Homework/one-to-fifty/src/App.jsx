import { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';

// state : react 컴포넌트가 기억하고 관리하는 데이터
// 시간, 사용자 행동에 따라 달라지는 데이터 state로 관리
// usestate: 함수 컨포넌트에서 state를 사용할 수 있게 해주는 react hook
// props : 부모 컨포넌트 > 자식 컨포넌트 전달하는 값
// app.jsx에서 생성한 setpage 함수를 header.jsx에서도 사용하기 위해서 props 사용

function App() {
  const [page, setPage] = useState('game');

  return (
    <>
      <Header page={page} setPage={setPage} />

      {page === 'game' ? (
        <GameBoard /> 
      ) : (
        <h1>랭킹 화면</h1>
      )}
    </>
  );
}

export default App;