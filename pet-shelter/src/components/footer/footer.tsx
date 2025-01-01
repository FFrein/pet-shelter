import { Link } from "react-router-dom";
import "./styles.css";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Первая колонка: Ссылки для входа и регистрации */}
          <div className="flex flex-col mb-4 md:mb-0">
            <Link
              to="/login-ps"
              className="mb-2 text-white hover:text-gray-400"
            >
              Войти в аккаунт приюта для животных
            </Link>
            <Link
              to="/registration-ps"
              className=" text-white hover:text-gray-400"
            >
              Зарегистрировать приют для животных
            </Link>
          </div>

          {/* Вторая колонка: Социальные сети */}
          <div className="flex flex-col">
            <span className="mb-2 text-white">Мы в социальных сетях:</span>
            <div className="flex flex-col">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-pink-700 transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-blue-700 hover:text-blue-900 transition-colors"
                aria-label="VK"
              >
                VK
              </a>
            </div>
          </div>
        </div>

        {/* Нижний текст */}
        <p className="mt-6 text-center text-gray-400">
          &copy; 2025 Pet-First. Все права защищены.
        </p>
      </div>
    </footer>
  );
};
