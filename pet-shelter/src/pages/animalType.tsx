import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimalTypesService } from "../api/services/all.services";

export const AnimalType = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState({});

  const fetchAnimal = useCallback(async () => {
    if (id) {
      try {
        const { data } = await AnimalTypesService.getById(Number(id));
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
      <h1>Вид Животного</h1>
      <p>id: {id}</p>
      <pre>{JSON.stringify(animal, null, 2)}</pre>
    </div>
  );
};
