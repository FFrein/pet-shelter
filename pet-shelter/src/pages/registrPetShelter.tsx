import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

export const RegisterPetShelter = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    description: "",
    city: "",
    country: "",
  });
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handlerSightIn = async (e: any) => {
    e.preventDefault();

    try {
      await store.registrationPS(
        form.email,
        form.password,
        form.name,
        form.address,
        form.description,
        form.city,
        form.country
      );

      if (store.isAuth) {
        navigate("/gallery");
      }
    } catch (error) {
      console.error(error);
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
            placeholder="name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
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
            placeholder="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <input
            placeholder="address"
            value={form.address}
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
            }}
          />
          <input
            placeholder="city"
            value={form.city}
            onChange={(e) => {
              setForm({ ...form, city: e.target.value });
            }}
          />
          <input
            placeholder="country"
            value={form.country}
            onChange={(e) => {
              setForm({ ...form, country: e.target.value });
            }}
          />
          <input
            placeholder="description"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            register a pet shelter
          </button>
          <Link to="/login-ps">
            <p>log in to pet shelter account</p>
          </Link>
        </form>
      </div>
    </div>
  );
};
