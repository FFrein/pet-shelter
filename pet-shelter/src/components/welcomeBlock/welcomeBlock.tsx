import { AnimalCarousel } from "../animalCarousel/animalCarousel";
import "./styles.scss";

export const WelcomeBlock = () => {
  return (
    <div className="welcome-block__wrapper">
      <article className="welcome-block">
        <div className="welcome-block__row welcome-block__row--left">
          <div className="welcome-block__title--upper">
            <img></img>
            <p className="welcome-block__title--text">
              Available in select states
            </p>
          </div>
          <h1 className="welcome-block__title">
            A pet-first <span>approach to</span> wellness
          </h1>
          <a className="welcome-block__button">
            <p>Learn More</p>
          </a>
        </div>
        <div className="welcome-block__row">
          <AnimalCarousel />
        </div>
      </article>
    </div>
  );
};
