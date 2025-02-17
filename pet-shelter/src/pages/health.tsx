import { GetAllDiseasesForm } from "../components/Diseases/GetAllDiseasesForm";

export const Health = () => {
  return (
    <div className="mx-auto w-[1200px]">
      <div className="flex flex-col">
        <div className="m-2 p-2 flex flex-col gap-2">
          <GetAllDiseasesForm />
        </div>
      </div>
    </div>
  );
};
