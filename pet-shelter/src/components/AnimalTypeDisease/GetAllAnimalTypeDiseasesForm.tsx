import { AnimalTypeDiseasesService } from "../../api/services/all.services";

export const GetAllAnimalTypeDiseasesForm = () => {
  const handleGetAll = async () => {
    try {
      const response = await AnimalTypeDiseasesService.getAll();
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при получении всех записей:", error);
    }
  };

  return <button onClick={handleGetAll}>Get All Animal Type Diseases</button>;
};
