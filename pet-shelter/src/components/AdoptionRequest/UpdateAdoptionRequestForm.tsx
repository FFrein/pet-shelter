import { useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";

export const UpdateAdoptionRequestForm = () => {
  const [id, setId] = useState<number>(0);
  const [animalId, setAnimalId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AdoptionRequestService.update(id, {
        animalId,
        userId,
        description,
        isProcessed: 0,
      });
      alert(`Заявка успешно обновлена: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Ошибка при обновлении заявки", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>
        Request ID:
        <input
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
      </label>
      <label>
        Animal ID:
        <input
          type="number"
          value={animalId}
          onChange={(e) => setAnimalId(Number(e.target.value))}
        />
      </label>
      <label>
        User ID:
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </label>
      <label>
        Processed:
        <input
          type="checkbox"
          checked={isProcessed}
          onChange={(e) => setIsProcessed(e.target.checked)}
        />
      </label>
      <button type="submit">Обновить заявку</button>
    </form>
  );
};
