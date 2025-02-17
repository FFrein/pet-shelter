import { useState } from "react";
import "./styles.css";

export const AnimalCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="animal-carousel__wrapper">
      <div className="animal-carousel">
        <img
          className="carousel-image h-[600px] w-[400px]"
          alt="animal"
          src={images[currentIndex]}
        />
        <div className="image-paginator">
          <button onClick={handlePrev} className="paginator-btn--left">
            &#9664;
          </button>
          <button onClick={handleNext} className="paginator-btn--right">
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
};
