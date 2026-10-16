// alert 마음에 안들어서 바꿀려하다보니 자연스럽게 심화과제
// createPortal: Html body에 직접 렌더링

import { createPortal } from 'react-dom';

const GameModal = ({ finalTime, onRestart }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="mb-2 text-2xl font-bold">게임 완료!</h2>

        <p className="mb-2 text-gray-500">Level 1 클리어</p>

        <p className="mb-6 text-3xl font-bold">
          {finalTime.toFixed(2)}초
        </p>

        <button
          onClick={onRestart}
          className="w-full rounded-lg bg-gray-900 py-3 font-semibold text-white hover:bg-gray-700"
        >
          다시 시작하기
        </button>
      </div>
    </div>,
    document.body
  );
};

export default GameModal;