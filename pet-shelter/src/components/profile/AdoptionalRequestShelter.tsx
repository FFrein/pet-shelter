import { UpdateAdoptionRequestForm } from "../AdoptionRequest/UpdateAdoptionRequestForm";
import { observer } from "mobx-react-lite";
import { GetShelterRequestByIdForm } from "../AdoptionRequest/GetShelterRequestByIdForm";

export const AdoptionalRequestShelter = observer(() => {
  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          <GetShelterRequestByIdForm />
          <UpdateAdoptionRequestForm />
        </div>
      </div>
    </div>
  );
});
