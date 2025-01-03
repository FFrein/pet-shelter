import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Lending } from "./pages/lending";
import { About } from "./pages/about";
import { AnimalStore } from "./pages/animalStore";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Health } from "./pages/health";
import { AnimalTypes } from "./pages/animalTypes";
import Header from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Registration } from "./pages/registration";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { LoginPetShelter } from "./pages/loginPetShelter";
import { RegisterPetShelter } from "./pages/registrPetShelter";
import { AnimalPage } from "./pages/animal";
import { AnimalType } from "./pages/animalType";
import { ToastContainer } from "react-toastify";

function App() {
  const { store } = useContext(Context);
  const [isAuth, setAuth] = useState(store.isAuth);

  useEffect(() => {
    store.checkAuth();
  }, []);

  useEffect(() => {
    setAuth(store.isAuth);
  }, [store.isAuth]);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <Routes>
          {!isAuth ? (
            <>
              <Route path={"/login"} element={<Login />}></Route>
              <Route path={"/registration"} element={<Registration />}></Route>
              <Route path={"/login-ps"} element={<LoginPetShelter />}></Route>
              <Route
                path={"/registration-ps"}
                element={<RegisterPetShelter />}
              ></Route>
            </>
          ) : (
            <>
              <Route path={"/profile/*"} element={<Profile />}></Route>
            </>
          )}
          <Route path={"/animal/:id"} element={<AnimalPage />}></Route>
          <Route path={"/animalType/:id"} element={<AnimalType />}></Route>
          <Route path={"/about"} element={<About />}></Route>
          <Route path={"/animal-store"} element={<AnimalStore />}></Route>
          <Route path={"/animal-types"} element={<AnimalTypes />}></Route>
          <Route path={"/health"} element={<Health />}></Route>
          <Route path={"*"} element={<Lending />}></Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default observer(App);
