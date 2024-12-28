import { Link } from "react-router-dom";
import "./styles.css";
export const Footer = () => {
  return (
    <footer className="footer__wrapper mt-auto">
      <div className="footer">
        <Link to="/login-ps">
          <p className="text-white">log in to pet shelter account</p>
        </Link>
        <Link to="/registration-ps">
          <p className="text-white">register a pet shelter</p>
        </Link>
      </div>
    </footer>
  );
};
