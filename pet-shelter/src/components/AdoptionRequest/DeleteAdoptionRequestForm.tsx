import { useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";

export const DeleteAdoptionRequestForm = () => {
  const [id, setId] = useState<number>(0);

  const handleDelete = async () => {
    try {
      await AdoptionRequestService.delete(id);
      alert(`Заявка с ID ${id} успешно удалена`);
    } catch (error) {
      console.error("Ошибка при удалении заявки", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label>
        Request ID:
        <input
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
      </label>
      <button onClick={handleDelete}>Удалить заявку</button>
    </div>
  );
};
