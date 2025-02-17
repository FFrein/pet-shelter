import { observer } from "mobx-react-lite";
import { CreateAnimalCriteriaForm } from "../AnimalCriteria/CreateAnimalCriteriaForm";
import { DeleteAnimalCriteriaForm } from "../AnimalCriteria/DeleteAnimalCriteriaForm";
import { GetAllCriteria } from "../Criteria/GetAllCriteria";

export const AnimalCriteriaProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2"></div>
        <GetAllCriteria />
        <CreateAnimalCriteriaForm />
        <DeleteAnimalCriteriaForm />
      </div>
    </div>
  );
});
