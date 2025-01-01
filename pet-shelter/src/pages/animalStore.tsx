import { GetAllAnimalsForm } from "../components/Animal/GetAllAnimalsForm";
import { CreateAnimalForm } from "../components/Animal/CreateAnimalForm";
import { UpdateAnimalForm } from "../components/Animal/UpdateAnimalForm";
import { DeleteAnimalForm } from "../components/Animal/DeleteAnimalForm";
import { GetAllPetSheltersForm } from "../components/GetAllPetSheltersForm";
import { useContext, useState } from "react";
import { Context } from "../main";
import CriteriaList from "../components/CriteriaList";

export const AnimalStore = () => {
  const { store } = useContext(Context);
  const [SearchCategories, setSearchCategories] = useState([]);
  return (
    <div className="mx-auto w-[1200px]">
      <div className="m-2 p-2 flex flex-col gap-2">
        <div>
          <div className="flex flex-row gap-2 w-full justify-between">
            <GetAllAnimalsForm SearchCategories={[SearchCategories]} />
            <CriteriaList setSearchCategories={setSearchCategories} />
          </div>
        </div>
        {store?.user?.role == "shelterManager" ? (
          <div className="m-2 p-2 flex flex-col gap-2">
            <h2>Pet Shelters</h2>
            <GetAllPetSheltersForm />
            <CreateAnimalForm />
            <UpdateAnimalForm />
            <DeleteAnimalForm />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
