import { GetAllAnimalTypesForm } from "../components/AnimalType/GetAllAnimalTypesForm";

export const AnimalTypes = () => {
  return (
    <div className="mx-auto w-[1200px]">
      <div className="mt-2 p-2 flex flex-col gap-2">
        <GetAllAnimalTypesForm />
      </div>
    </div>
  );
};
