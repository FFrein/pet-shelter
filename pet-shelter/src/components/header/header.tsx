import "./styles.css";
import { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Header = () => {
  const { store } = useContext(Context);
  return (
    <header className="header__wrapper">
      <div className="header__content">
        <article className="header">
          <a href="/">
            <div className="header__logo-block">
              <img
                className="header__logo"
                src="./../ico/logo.svg"
                alt="logo"
              />
              <h4 className="header__logo-text">Pet-First</h4>
            </div>
          </a>

          <nav className="header__navigation">
            <a className="header__navigation-element" href="/about">
              About
            </a>
            <a className="header__navigation-element" href="/animal-store">
              Store
            </a>
            <a className="header__navigation-element" href="/health">
              Health
            </a>
            <a className="header__navigation-element" href="/animal-types">
              Bestiary
            </a>
          </nav>

          {store.isAuth ? (
            <Link to="profile">
              <div className="bg-transparent hover:bg-white text-white font-semibold hover:text-[#062d3e] py-2 px-4 border border-white hover:border-transparent rounded-full">
                profile
              </div>
            </Link>
          ) : (
            <div className="header__buttons">
              <a href="/login">
                <p className="header__button">Sign In</p>
              </a>
            </div>
          )}
        </article>
      </div>
    </header>
  );
};

export default observer(Header);
