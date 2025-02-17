import { observer } from "mobx-react-lite";

import { CreateAnimalDiseaseForm } from "../AnimalDiseases/CreateAnimalDiseaseForm";
import { DeleteAnimalDiseaseForm } from "../AnimalDiseases/DeleteAnimalDiseaseForm";

export const AnimalDiseasesFormProfile = observer(() => {
  return (
    <div className="w-full mx-automt-2">
      <div>
        <div className="flex flex-col gap-2">
          <h2>Animal Diseases</h2>
          <CreateAnimalDiseaseForm />
          <DeleteAnimalDiseaseForm />
        </div>
      </div>
    </div>
  );
});
