import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handlerSightIn = async (e: any) => {
    e.preventDefault();

    try {
      await store.login(form.email, form.password);

      if (store.isAuth) {
        navigate("/gallery");
      } else {
        alert("Ошибка авторищзации");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка авторищзации");
    }
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handlerSightIn}
          className="flex flex-col gap-2 max-w-sm mx-auto p-4"
        >
          <input
            placeholder="login"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <input
            placeholder="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Sign in
          </button>
          <Link to="/registration">
            <p>Sign up</p>
          </Link>
        </form>
      </div>
    </div>
  );
};
