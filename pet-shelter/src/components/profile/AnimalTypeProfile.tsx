import { observer } from "mobx-react-lite";

import { DeleteAnimalTypeForm } from "../AnimalType/DeleteAnimalTypeForm";
import { CreateAnimalTypeForm } from "../AnimalType/CreateAnimalTypeForm";

export const AnimalTypeProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <CreateAnimalTypeForm />
          <DeleteAnimalTypeForm />
        </div>
      </div>
    </div>
  );
});
