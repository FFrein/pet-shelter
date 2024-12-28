import { useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";

export const GetAdoptionRequestByIdForm = () => {
  const [id, setId] = useState<number>(0);
  const [request, setRequest] = useState<any>(null);

  const handleFetch = async () => {
    try {
      const response = await AdoptionRequestService.getById(id);
      setRequest(response.data);
    } catch (error) {
      console.error("Ошибка при получении заявки", error);
    }
  };

  return (
    <div>
      <label>
        Request ID:
        <input
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
      </label>
      <button onClick={handleFetch}>Получить заявку</button>
      {request && (
        <div>
          <p>ID: {request.ID}</p>
          <p>Animal ID: {request.animalId}</p>
          <p>User ID: {request.userId}</p>
          <p>Processed: {request.isProcessed.toString()}</p>
        </div>
      )}
    </div>
  );
};
