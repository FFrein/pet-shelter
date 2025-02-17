import { Link } from "react-router-dom";
import { AnimalCarousel } from "../animalCarousel/animalCarousel";
import "./styles.css";

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
          <Link to={"/about"} className="welcome-block__button">
            <p>Learn More</p>
          </Link>
        </div>
        <div className="welcome-block__row">
          <AnimalCarousel
            images={[
              "./images/BigDogWithHoodie.svg",
              "./images/papuga2.png",
              "./images/cat1.png",
            ]}
          />
        </div>
      </article>
    </div>
  );
};
