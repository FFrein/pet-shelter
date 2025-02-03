import { observer } from "mobx-react-lite";
import { CreateDiseaseForm } from "../Diseases/CreateDiseaseForm";
import { DeleteDiseaseForm } from "../Diseases/DeleteDiseaseForm";

export const DiseasesProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <CreateDiseaseForm />
          <DeleteDiseaseForm />
        </div>
      </div>
    </div>
  );
});
