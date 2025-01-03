import { observer } from "mobx-react-lite";
import { CreateAnimalCriteriaForm } from "../AnimalCriteria/CreateAnimalCriteriaForm";
import { DeleteAnimalCriteriaForm } from "../AnimalCriteria/DeleteAnimalCriteriaForm";
import { UpdateAnimalCriteriaForm } from "../AnimalCriteria/UpdateAnimalCriteriaForm";

export const AnimalCriteriaProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2"></div>
        <CreateAnimalCriteriaForm />
        <UpdateAnimalCriteriaForm />
        <DeleteAnimalCriteriaForm />
      </div>
    </div>
  );
});
