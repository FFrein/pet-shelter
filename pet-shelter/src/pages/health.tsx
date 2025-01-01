import { CreateDiseaseForm } from "../components/Diseases/CreateDiseaseForm";
import { GetAllDiseasesForm } from "../components/Diseases/GetAllDiseasesForm";
import { DeleteDiseaseForm } from "../components/Diseases/DeleteDiseaseForm";
import { GetDiseaseByIdForm } from "../components/Diseases/GetDiseaseByIdForm";

import { GetAllAnimalTypeDiseasesForm } from "../components/AnimalTypeDisease/GetAllAnimalTypeDiseasesForm";
import { UpdateAnimalTypeDiseaseForm } from "../components/AnimalTypeDisease/UpdateAnimalTypeDiseaseForm";
import { CreateAnimalTypeDiseaseForm } from "../components/AnimalTypeDisease/CreateAnimalTypeDiseaseForm";
import { DeleteAnimalTypeDiseaseForm } from "../components/AnimalTypeDisease/DeleteAnimalTypeDiseaseForm";
import { GetAnimalTypeDiseaseByIdForm } from "../components/AnimalTypeDisease/GetAnimalTypeDiseaseByIdForm";
import { useContext } from "react";
import { Context } from "../main";

export const Health = () => {
  const { store } = useContext(Context);

  return (
    <div className="mx-auto w-[1200px]">
      <div className="m-2 p-2 flex flex-col gap-2 border border-[#062d3e]">
        <h2>Diseases</h2>
        <GetAllDiseasesForm />
      </div>

      {store?.user?.role == "admin" ? (
        <div>
          <GetDiseaseByIdForm />
          <CreateDiseaseForm />
          <DeleteDiseaseForm />
        </div>
      ) : (
        ""
      )}

      {store?.user?.role == "admin" ? (
        <>
          <div className="m-2 p-2 flex flex-col gap-2 border border-[#062d3e]">
            <h2>Animal Type Diseases</h2>
            <GetAllAnimalTypeDiseasesForm />
            <GetAnimalTypeDiseaseByIdForm />
            <CreateAnimalTypeDiseaseForm />
            <UpdateAnimalTypeDiseaseForm />
            <DeleteAnimalTypeDiseaseForm />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
