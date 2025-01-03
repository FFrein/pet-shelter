import { Link } from "react-router-dom";
import "./styles.css";

export const CategoryExampleLine = () => {
  return (
    <div className="CategoryExampleLine__wrapper">
      <div className="CategoryExampleLine">
        <div className="flex mt-2 space-x-10">
          <div className="bg-[#ed5c01] rounded-lg p-2 flex justify-center items-center">
            <Link to={"/animal-store"}>
              <img
                className="w-[200px] rounded"
                src="./images/cat.png"
                alt="cat"
              />
            </Link>
          </div>
          <div className="bg-[#ed5c01] rounded-lg p-2 flex justify-center items-center">
            <Link to={"/animal-store"}>
              <img
                className="w-[200px] rounded"
                src="./images/dog.png"
                alt="dog"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
