import { useCallback, useContext, useState, useEffect } from "react";
import { Context } from "../main";
import { useParams } from "react-router-dom";
import { AnimalsService } from "../api/services/all.services";
import { CreateAdoptionRequestForm } from "../components/AdoptionRequest/CreateAdoptionRequestForm";
import { UpdateAdoptionRequestForm } from "../components/AdoptionRequest/UpdateAdoptionRequestForm";
import { DeleteAdoptionRequestForm } from "../components/AdoptionRequest/DeleteAdoptionRequestForm";

export const Animal = () => {
  const { store } = useContext(Context);
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState({});

  const fetchAnimal = useCallback(async () => {
    if (id) {
      try {
        const { data } = await AnimalsService.getById(Number(id));
        setAnimal(data);
      } catch (error) {
        console.error("Ошибка при загрузке животного:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchAnimal();
  }, [fetchAnimal]);

  return (
    <div className="mx-auto w-[1200px]">
      <div>
        <h1>Животное</h1>
        <pre>
          <strong>Имя:</strong> {animal.Name},<strong>Описание:</strong>{" "}
          {animal.Description},<strong>Тип:</strong>{" "}
          {animal.AnimalType?.TypeName}
          <div>
            <strong>Приют:</strong> {animal.PetShelter?.name},
            <strong>Страна:</strong> {animal.PetShelter?.country},
            <strong>Город:</strong> {animal.PetShelter?.city},
            <strong>Адрес:</strong> {animal.PetShelter?.address}
          </div>
          <div>
            <h2>Болезни</h2>
            <ul>
              {animal?.Diseases?.length > 0
                ? animal.Diseases.map((diseases) => {
                    return (
                      <li key={diseases.Diseases.ID}>
                        {diseases.Diseases.Name}
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </pre>
      </div>

      {store.user.role == "user" ? (
        <div>
          {/* Добавить загрузку для просмотра текущей заявки */}
          <CreateAdoptionRequestForm _animalId={parseInt(id)} />
          <UpdateAdoptionRequestForm />
          <DeleteAdoptionRequestForm />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
