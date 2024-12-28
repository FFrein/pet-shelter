import { AnimalDiseasesService } from "../../api/services/all.services";

export const GetAllAnimalDiseasesForm = () => {
  const handleGetAll = async () => {
    try {
      const response = await AnimalDiseasesService.getAll();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleGetAll}>Get All Animal Diseases</button>;
};
