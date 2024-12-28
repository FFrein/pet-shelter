import { useContext, useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

export const CreateAdoptionRequestForm = observer(() => {
  const { store } = useContext(Context);
  const [animalId, setAnimalId] = useState<number>(0);
  const [userId] = useState<number>(parseInt(store.user.id));
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AdoptionRequestService.create({
        animalId,
        userId,
        description,
      });
      alert(`Заявка успешно создана: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Ошибка при создании заявки", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>
        Animal ID:
        <input
          type="number"
          value={animalId}
          onChange={(e) => setAnimalId(Number(e.target.value))}
        />
      </label>
      {/*
        <label>
        User ID:
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </label>
      */}
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <button type="submit">Создать заявку</button>
    </form>
  );
});
