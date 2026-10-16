import style from './Header.module.css';

const Header = ({ page, setPage, gameTime }) => {

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <button onClick={() => setPage('game')}>게임</button>
        <button onClick={() => setPage('ranking')}>랭킹</button>
      </nav>

      {page === 'game' && (
        <div className={style.info}>
          <select defaultValue="1">
            <option value="1">Level 1</option>
            <option value="2" disabled>Level 2</option>
            <option value="3" disabled>Level 3</option>
          </select>

          <span>{gameTime.toFixed(2)}초</span>
        </div>
      )}
    </header>
  );
};

export default Header;