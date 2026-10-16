import style from "./Header.module.css";

const Header = ({ page, setPage, gameTime }) => {
  return (
    <header className={`${style.header} px-8 py-5 shadow-sm`}>
      <nav className={style.nav}>
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

      {page === "game" && (
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg font-medium shadow-sm">
            <option value="1">Level 1</option>
            <option value="2" disabled>
              Level 2
            </option>
            <option value="3" disabled>
              Level 3
            </option>
          </select>

          <span className="rounded-lg bg-slate-900 px-4 py-3 text-lg font-semibold text-white tabular-nums shadow-sm">
            {gameTime.toFixed(2)}초
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
