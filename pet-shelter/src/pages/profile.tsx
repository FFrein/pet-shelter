import { useContext } from "react";
import { Context } from "../main";
import LogoutButton from "../components/Buttons/LogoutButtont";
import { CreateAnimalDiseaseForm } from "../components/AnimalDiseases/CreateAnimalDiseaseForm";
import { GetAllAnimalDiseasesForm } from "../components/AnimalDiseases/GetAllAnimalDiseasesForm";
import { DeleteAdoptionRequestForm } from "../components/AdoptionRequest/DeleteAdoptionRequestForm";
import { GetAdoptionRequestByIdForm } from "../components/AdoptionRequest/GetAdoptionRequestByIdForm";
import { GetAllAdoptionRequestsForm } from "../components/AdoptionRequest/GetAllAdoptionRequestsForm";
import { UpdateAdoptionRequestForm } from "../components/AdoptionRequest/UpdateAdoptionRequestForm";
import { CreateAdoptionRequestForm } from "../components/AdoptionRequest/CreateAdoptionRequestForm";
import { observer } from "mobx-react-lite";

export const Profile = observer(() => {
  const { store } = useContext(Context);

  if (store?.user?.role == "petShelter") {
    return (
      <div>
        <h1>Pet Shelter</h1>
        <p>{store.user.email}</p>
        <p>{store.user.role}</p>
        <p>{store.user.id}</p>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>Profile</h1>
          <p>{store.user.email}</p>
          <p>{store.user.role}</p>
          <p>{store.user.id}</p>
          <LogoutButton />
        </div>
        <div>
          <div className="m-2 p-2 flex flex-col gap-2 border border-[#062d3e]">
            <h2>Animal Diseases</h2>
            <GetAllAnimalDiseasesForm />
            <CreateAnimalDiseaseForm />
          </div>

          <div className="m-2 p-2 flex flex-col gap-2 border border-[#062d3e]">
            <GetAllAdoptionRequestsForm />

            {store.user.role == "shelterManager" ? (
              <div>
                <GetAdoptionRequestByIdForm />
                <UpdateAdoptionRequestForm />
              </div>
            ) : (
              ""
            )}
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
  }
});