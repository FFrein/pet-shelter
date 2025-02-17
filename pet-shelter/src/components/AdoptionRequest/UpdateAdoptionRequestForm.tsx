import { useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";

export const UpdateAdoptionRequestForm = () => {
  const [id, setId] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AdoptionRequestService.update(id, {
        answer,
        isProcessed: 1,
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
        answer:
        <input
          type="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
      <button type="submit">Обновить заявку</button>
    </form>
  );
};
