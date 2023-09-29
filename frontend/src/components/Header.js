import logo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";


function Header({ loggedIn, setLoggedIn, headerText, userEmail }) {
  const navigate = useNavigate();

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  function changePage() {
    return headerText === 'Регистрация' ? navigate("/sign-up") : navigate("/sign-in");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      {loggedIn ? <div className="header__bar">
        <h2 className="header__email">{userEmail}</h2>
        <button
          className="header__logout-button"
          onClick={handleLogout}
          type="button"
        >Выйти</button>
      </div> : <button className="header__authentication-button" type="button" onClick={changePage}>{headerText}</button>}
    </header>
  )
}

export default Header
