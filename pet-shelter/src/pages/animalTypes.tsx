import { DeleteAnimalTypeForm } from "../components/AnimalType/DeleteAnimalTypeForm";
import { GetAnimalTypeByIdForm } from "../components/AnimalType/GetAnimalTypeByIdForm";
import { CreateAnimalTypeForm } from "../components/AnimalType/CreateAnimalTypeForm";
import { UpdateAnimalDiseaseForm } from "../components/AnimalDiseases/UpdateAnimalDiseaseForm";
import { GetAllAnimalTypesForm } from "../components/AnimalType/GetAllAnimalTypesForm";
import { useContext } from "react";
import { Context } from "../main";

export const AnimalTypes = () => {
  const { store } = useContext(Context);

  return (
    <div className="mx-auto w-[1200px]">
      <div className="m-2 p-2 flex flex-col gap-2">
        <h2>Animal Type</h2>
        <GetAllAnimalTypesForm />

        {store?.user?.role == "shelterManager" ? (
          <div>
            <GetAnimalTypeByIdForm />
            <CreateAnimalTypeForm />
            <UpdateAnimalDiseaseForm />
            <DeleteAnimalTypeForm />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
