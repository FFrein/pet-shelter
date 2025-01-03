import { observer } from "mobx-react-lite";

import { DeleteAnimalTypeForm } from "../AnimalType/DeleteAnimalTypeForm";
import { GetAnimalTypeByIdForm } from "../AnimalType/GetAnimalTypeByIdForm";
import { CreateAnimalTypeForm } from "../AnimalType/CreateAnimalTypeForm";
import { UpdateAnimalDiseaseForm } from "../AnimalDiseases/UpdateAnimalDiseaseForm";

export const AnimalTypeProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <GetAnimalTypeByIdForm />
          <CreateAnimalTypeForm />
          <UpdateAnimalDiseaseForm />
          <DeleteAnimalTypeForm />
        </div>
      </div>
    </div>
  );
});
