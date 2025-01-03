import { AnimalCriteriaService } from "../../api/services/criteria.service";

export const AnimalCriteriaList = () => {
  const handleGetAll = async () => {
    try {
      const response = await AnimalCriteriaService.getAll();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleGetAll}>Get All Animal Criteria</button>;
};
