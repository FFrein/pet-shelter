import { useContext } from "react";
import { Context } from "../../main";

import { DeleteAdoptionRequestForm } from "../AdoptionRequest/DeleteAdoptionRequestForm";
import { GetAdoptionRequestByIdForm } from "../AdoptionRequest/GetAdoptionRequestByIdForm";
import { GetAllAdoptionRequestsForm } from "../AdoptionRequest/GetAllAdoptionRequestsForm";
import { UpdateAdoptionRequestForm } from "../AdoptionRequest/UpdateAdoptionRequestForm";
import { CreateAdoptionRequestForm } from "../AdoptionRequest/CreateAdoptionRequestForm";
import { observer } from "mobx-react-lite";

export const AdminProfile = observer(() => {
  const { store } = useContext(Context);

  return (
    <div className="mx-auto">
      <div>
        <div className="flex flex-col gap-2">
          {store.user.role == "shelterManager" ? (
            <>
              <div>
                <GetAdoptionRequestByIdForm />
              </div>
            </>
          ) : (
            ""
          )}

          {store?.user?.role == "shelterManager" ? (
            <div className="m-2 p-2 flex flex-col gap-2">
              <h2>Pet Shelters</h2>
            </div>
          ) : (
            ""
          )}

          <GetAllAdoptionRequestsForm />

          {store.user.role == "user" ? (
            <div>
              <CreateAdoptionRequestForm />
              <UpdateAdoptionRequestForm />
              <DeleteAdoptionRequestForm />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
});
