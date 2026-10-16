import { useState } from "react";

import style from "./Header.module.css";

const Header = ({ page, setPage, gameTime, level, setLevel }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-gray-200 bg-gray-100 px-8 py-5 shadow-sm">
      <h1 className="justify-self-start text-xl font-bold text-gray-900">
        🎮 숫자 게임
      </h1>

      <nav className={`${style.nav} justify-self-center`}>
        <button
          className={`rounded-lg px-5 py-3 font-medium transition-colors ${
            page === "game"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setPage("game")}
        >
          게임
        </button>
        <button
          className={`rounded-lg px-5 py-3 font-medium transition-colors ${
            page === "ranking"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setPage("ranking")}
        >
          랭킹
        </button>
      </nav>

      <div className="justify-self-end">
        {page === "game" && (
          <div className="flex items-center gap-4">
            <div
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsOpen(false);
                }
              }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Level {level}
                <span className="text-sm">{isOpen ? "⌃" : "⌄"}</span>
              </button>

              {isOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-lg">
                  {[1, 2, 3].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setLevel(item);
                        setIsOpen(false);
                      }}
                      className={`block w-full rounded-lg px-4 py-3 text-left transition-colors ${
                        level === item
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Level {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="rounded-lg bg-slate-900 px-4 py-3 text-lg font-semibold text-white tabular-nums shadow-sm">
              {gameTime.toFixed(2)}초
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
