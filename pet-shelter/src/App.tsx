import "./App.scss";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Lending } from "./pages/lending/lending";
import { About } from "./pages/about/about";
import { AnimalStore } from "./pages/animalStore/animalStore";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/profile/profile";
import { Health } from "./pages/health/health";
import { AnimalTypes } from "./pages/animalTypes/animalTypes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Lending />}></Route>
          <Route path={"/about"} element={<About />}></Route>
          <Route path={"/animal-store"} element={<AnimalStore />}></Route>
          <Route path={"/animal-types"} element={<AnimalTypes />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/profile"} element={<Profile />}></Route>
          <Route path={"/health"} element={<Health />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
