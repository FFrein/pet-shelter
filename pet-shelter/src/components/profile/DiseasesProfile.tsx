import { observer } from "mobx-react-lite";
import { GetDiseaseByIdForm } from "../Diseases/GetDiseaseByIdForm";
import { CreateDiseaseForm } from "../Diseases/CreateDiseaseForm";
import { DeleteDiseaseForm } from "../Diseases/DeleteDiseaseForm";

export const DiseasesProfile = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <GetDiseaseByIdForm />
          <CreateDiseaseForm />
          <DeleteDiseaseForm />
        </div>
      </div>
    </div>
  );
});
