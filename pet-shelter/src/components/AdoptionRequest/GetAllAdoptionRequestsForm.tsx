import { useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";

export const GetAllAdoptionRequestsForm = () => {
  const [requests, setRequests] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await AdoptionRequestService.getAll("all");
      setRequests(response.data);
    } catch (error) {
      console.error("Ошибка при получении заявок", error);
    }
  };

  return (
    <div>
      <button onClick={handleFetch}>Получить все заявки</button>
      <ul>
        {requests
          ? requests.map((req: any) => (
              <li key={req.ID}>
                ID: {req.ID}, Animal ID: {req.AnimalId}, User ID: {req.UserId},
                Description: {req.description}, Processed:{" "}
                {req.isProcessed.toString()}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
