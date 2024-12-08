import "./styles.scss";

export const Header = () => {
  return (
    <header className="header__wrapper">
      <article className="header">
        <a href="#/">
          <div className="header__logo-block">
            <img className="header__logo" src="./../ico/logo.svg" alt="logo" />
            <h4 className="header__logo-text">Pet-First</h4>
          </div>
        </a>

        <nav className="header__navigation">
          <a className="header__navigation-element" href="#/about">
            About
          </a>
          <a className="header__navigation-element" href="#/animal-store">
            Store
          </a>
          <a className="header__navigation-element" href="#/health">
            Health
          </a>
          <a className="header__navigation-element" href="#/animal-types">
            Bestiary
          </a>
        </nav>

        <div className="header__buttons">
          <a href="#/login">
            <p className="header__button">Sign In</p>
          </a>
        </div>
      </article>
    </header>
  );
};
