import React, { useContext } from "react";
import { Context } from "../main";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

// Импортируем подкомпоненты
import { AnimalFormProfile } from "../components/profile/AnimalFormProfile";
import { AdminProfile } from "../components/profile//AdminProfile";
import { UserProfile } from "../components/profile/UserProfile";
import { DiseasesProfile } from "../components/profile/DiseasesProfile";
import { AnimalTypeDiseasesProfile } from "../components/profile/AnimalTypeDiseasesProfile";
import LogoutButton from "../components/Buttons/LogoutButtont";
import { AnimalDiseasesFormProfile } from "../components/profile/AnimalDiseasesFormProfile";
import { AnimalTypeProfile } from "../components/profile/AnimalTypeProfile";
import { AdoptionalRequestShelter } from "../components/profile/AdoptionalRequestShelter";
import { AnimalCriteriaProfile } from "../components/profile/AnimalCriteriaProfile";
import { CriteriaProfile } from "../components/profile/Criteria";

const Profile: React.FC = observer(() => {
  const { store } = useContext(Context);
  const role = store?.user?.role;

  if (!role) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen mx-auto w-[1200px] mt-2">
      {/* Боковая панель навигации */}
      <aside className="w-full md:w-1/4 mt-2 mb-2 ">
        <div className="flex flex-col space-y-4 p-6 mb-2 border border-[#062d3e] rounded">
          <p>{store.user.email}</p>
          <p>{store.user.role}</p>
          <LogoutButton />
        </div>
        <nav className="flex flex-col space-y-4 p-6 border border-[#062d3e] rounded">
          <h2 className="text-2xl font-semibold mb-2">Меню</h2>

          {role === "petShelter" && (
            <Link to="pet-shelter" className="text-blue-500 hover:underline">
              Информация о Приюте
            </Link>
          )}

          {role === "shelterManager" && (
            <>
              <Link
                to="animal-form-profile"
                className="text-blue-500 hover:underline"
              >
                Животные
              </Link>
              <Link
                to="animal-diseases-form-profile"
                className="text-blue-500 hover:underline"
              >
                Заболевания животных
              </Link>
              <Link
                to="animal-criteria"
                className="text-blue-500 hover:underline"
              >
                Критерии животных
              </Link>
              <Link
                to="adoptional-request-shelter"
                className="text-blue-500 hover:underline"
              >
                Запросы
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="admin" className="text-blue-500 hover:underline">
                Admin
              </Link>
              <Link to="animal-type" className="text-blue-500 hover:underline">
                Animal Type
              </Link>
              <Link to="diseases" className="text-blue-500 hover:underline">
                Diseases
              </Link>
              {/*
              <Link
                to="animal-type-diseases"
                className="text-blue-500 hover:underline"
              >
                Animal Type Diseases
              </Link>
               */}
              <Link to="criteria" className="text-blue-500 hover:underline">
                Criteria
              </Link>
            </>
          )}

          {role === "user" && (
            <Link
              to="adoption-requests"
              className="text-blue-500 hover:underline"
            >
              Заявки на Усыновление
            </Link>
          )}
        </nav>
      </aside>

      <main className="pl-6 w-full">
        <Routes>
          {role === "shelterManager" ? (
            <>
              <Route
                path="animal-form-profile"
                element={<AnimalFormProfile />}
              />
              <Route
                path="animal-diseases-form-profile"
                element={<AnimalDiseasesFormProfile />}
              />
              <Route
                path="adoptional-request-shelter"
                element={<AdoptionalRequestShelter />}
              />
              <Route
                path="animal-criteria"
                element={<AnimalCriteriaProfile />}
              />
            </>
          ) : (
            ""
          )}
          {role === "admin" ? (
            <>
              <Route path="/admin" element={<AdminProfile />} />
              <Route path="/animal-type" element={<AnimalTypeProfile />} />
              <Route path="/diseases" element={<DiseasesProfile />} />
              <Route
                path="/animal-type-diseases"
                element={<AnimalTypeDiseasesProfile />}
              />
              <Route path="/criteria" element={<CriteriaProfile />} />
            </>
          ) : (
            ""
          )}
          {role === "user" ? <Route path="/*" element={<UserProfile />} /> : ""}
        </Routes>
      </main>
    </div>
  );
});

export { Profile };
