import "./styles.scss";

export const AnimalCarousel = () => {
  return (
    <div className="animal-carousel__wrapper">
      <div className="animal-carousel">
        <img
          className="dog-image"
          alt="dog"
          src="./images/BigDogWithHoodie.svg"
        />
        <div className="image-paginator">
          <a>
            <p className="paginator-btn--left"></p>
          </a>
          <a>
            <p className="paginator-btn--right"></p>
          </a>
        </div>
      </div>
    </div>
  );
};
