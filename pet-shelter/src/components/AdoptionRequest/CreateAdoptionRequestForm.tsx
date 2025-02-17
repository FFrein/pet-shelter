import { useContext, useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

type CreateAdoptionRequestFormType = {
  _animalId?: number | undefined;
};

export const CreateAdoptionRequestForm: React.FC<CreateAdoptionRequestFormType> =
  observer(({ _animalId }) => {
    const { store } = useContext(Context);
    const [animalId, setAnimalId] = useState<number>(_animalId || 0);
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
        {_animalId ? (
          ""
        ) : (
          <label>
            Animal ID:
            <input
              type="number"
              value={animalId}
              onChange={(e) => setAnimalId(Number(e.target.value))}
            />
          </label>
        )}

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
