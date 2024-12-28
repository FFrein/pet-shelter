import { DiseasesService } from "../../api/services/all.services";

export const GetAllDiseasesForm = () => {
  const handleGetAll = async () => {
    try {
      const response = await DiseasesService.getAll();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleGetAll}>Get All Diseases</button>;
};
