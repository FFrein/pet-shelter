import { CategoryExampleLine } from "../components/categoryExampleLine/categoryExampleLine";
import { WelcomeBlock } from "../components/welcomeBlock/welcomeBlock";
import "./lending.css";

export const Lending = () => {
  return (
    <div className="lending__wrapper">
      <WelcomeBlock />
      <img
        className="blue-background--right"
        alt="blueBackground"
        src="./images/blueBackground.svg"
      />
      <CategoryExampleLine />
    </div>
  );
};
