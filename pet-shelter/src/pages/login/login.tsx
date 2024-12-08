import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

export const Login = () => {
  return (
    <div>
      <Header />
      <div>
        <input placeholder="Login" type="text" />
        <input placeholder="Password" type="password" />
      </div>
      <Footer />
    </div>
  );
};
