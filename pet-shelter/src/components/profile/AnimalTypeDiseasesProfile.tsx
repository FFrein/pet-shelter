import { observer } from "mobx-react-lite";
import { UpdateAnimalTypeDiseaseForm } from "../AnimalTypeDisease/UpdateAnimalTypeDiseaseForm";
import { GetAnimalTypeDiseaseByIdForm } from "../AnimalTypeDisease/GetAnimalTypeDiseaseByIdForm";
import { GetAllAnimalTypeDiseasesForm } from "../AnimalTypeDisease/GetAllAnimalTypeDiseasesForm";
import { CreateAnimalTypeDiseaseForm } from "../AnimalTypeDisease/CreateAnimalTypeDiseaseForm";
import { DeleteAnimalTypeDiseaseForm } from "../AnimalTypeDisease/DeleteAnimalTypeDiseaseForm";

export const AnimalTypeDiseasesProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <h2>Animal Type Diseases</h2>
          <GetAllAnimalTypeDiseasesForm />
          <GetAnimalTypeDiseaseByIdForm />
          <CreateAnimalTypeDiseaseForm />
          <UpdateAnimalTypeDiseaseForm />
          <DeleteAnimalTypeDiseaseForm />
        </div>
      </div>
    </div>
  );
});
