import { GetAllAnimalsForm } from "../components/Animal/GetAllAnimalsForm";
import { CreateAnimalForm } from "../components/Animal/CreateAnimalForm";
import { UpdateAnimalForm } from "../components/Animal/UpdateAnimalForm";
import { DeleteAnimalForm } from "../components/Animal/DeleteAnimalForm";
import { GetAllPetSheltersForm } from "../components/GetAllPetSheltersForm";
import { useContext } from "react";
import { Context } from "../main";

export const AnimalStore = () => {
  const { store } = useContext(Context);
  return (
    <div className="mx-auto w-[1200px]">
      <div className="m-2 p-2 flex flex-col gap-2">
        <h2>Pet Shelters</h2>
        <GetAllPetSheltersForm />
      </div>

      <div className="m-2 p-2 flex flex-col gap-2">
        <h2>Animal</h2>
        <GetAllAnimalsForm />
        {store?.user?.role == "shelterManager" ? (
          <>
            <CreateAnimalForm />
            <UpdateAnimalForm />
            <DeleteAnimalForm />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
