import { useContext } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

import { CreateAnimalForm } from "../Animal/CreateAnimalForm";
import { UpdateAnimalForm } from "../Animal/UpdateAnimalForm";
import { DeleteAnimalForm } from "../Animal/DeleteAnimalForm";
import { GetAllAnimalsForm } from "../Animal/GetAllAnimalsForm";

export const AnimalFormProfile = observer(() => {
  const { store } = useContext(Context);

  return (
    <div className="w-full mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <h2>Animal</h2>
          <GetAllAnimalsForm
            SearchCategories={[]}
            Country={""}
            Type={""}
            PetShelterId={store.user.id}
          />
          <CreateAnimalForm />
          <UpdateAnimalForm />
          <DeleteAnimalForm />
        </div>
      </div>
    </div>
  );
});
