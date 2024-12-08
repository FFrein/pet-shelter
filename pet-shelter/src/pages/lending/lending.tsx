import { CategoryExampleLine } from "../../components/categoryExampleLine/categoryExampleLine";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { WelcomeBlock } from "../../components/welcomeBlock/welcomeBlock";
import "./lending.scss";

export const Lending = () => {
  return (
    <div className="lending__wrapper">
      <Header />
      <WelcomeBlock />
      <img
        className="blue-background--right"
        alt="blueBackground"
        src="./images/blueBackground.svg"
      />
      <CategoryExampleLine />
      <Footer />
    </div>
  );
};
