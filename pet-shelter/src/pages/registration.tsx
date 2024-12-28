import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

export const Registration = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handlerSightIn = async (e: any) => {
    e.preventDefault();

    try {
      await store.registration(
        form.username,
        form.email,
        form.password,
        form.phonenumber
      );

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
            placeholder="username"
            value={form.username}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
          />
          <input
            placeholder="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <input
            placeholder="phone number"
            value={form.phonenumber}
            onChange={(e) => {
              setForm({ ...form, phonenumber: e.target.value });
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
            Sign up
          </button>
          <Link to="/login">
            <p>Sign in</p>
          </Link>
        </form>
      </div>
    </div>
  );
};
