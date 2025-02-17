import React, { useCallback, useContext, useState, useEffect } from "react";
import { Context } from "../main";
import { useParams } from "react-router-dom";
import {
  AdoptionRequestService,
  AnimalsService,
} from "../api/services/all.services";
import { CreateAdoptionRequestForm } from "../components/AdoptionRequest/CreateAdoptionRequestForm";
import { AdoptionRequest, Animal } from "../consts/models";

export const AnimalPage: React.FC = () => {
  const { store } = useContext(Context);
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [request, setRequest] = useState({} as AdoptionRequest);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimal = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      try {
        const { data } = await AnimalsService.getById(Number(id));
        setAnimal(data);
        setError(null);
      } catch (error: any) {
        console.error("Ошибка при загрузке животного:", error);
        setError("Не удалось загрузить информацию о животном.");
        setAnimal(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  const fetchAdoptionrequest = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      try {
        const { data } = await AdoptionRequestService.getById(id);
        setRequest(data);
      } catch (error: any) {
        setError("Не удалось загрузить информацию о запросе.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchAnimal();
    if (store.user.role == "user") {
      fetchAdoptionrequest();
    }
  }, [fetchAnimal]);

  useEffect(() => {
    fetchAdoptionrequest();
  }, [fetchAdoptionrequest]);

  return (
    <div className="container p-4 mx-auto w-[1200px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : animal ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Информация о животном</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={animal.ImageUrl} />

            {/* Основная информация */}
            <div>
              <h2 className="text-xl font-semibold">Основные данные</h2>
              <p className="mt-2">
                <strong>Имя:</strong> {animal.Name}
              </p>
              <p className="mt-1">
                <strong>Описание:</strong> {animal.Description}
              </p>
              <p className="mt-1">
                <strong>Возраст:</strong> {animal.Age} лет
              </p>
              <p className="mt-1">
                <strong>Пол:</strong> {animal.Gender}
              </p>
              <p className="mt-1">
                <strong>Тип:</strong> {animal.AnimalType?.TypeName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Информация о приюте */}
            <div>
              <h2 className="text-xl font-semibold">Приют</h2>
              {animal.PetShelter ? (
                <div className="mt-2">
                  <p>
                    <strong>Название:</strong> {animal.PetShelter.name}
                  </p>
                  <p className="mt-1">
                    <strong>Страна:</strong> {animal.PetShelter.country}
                  </p>
                  <p className="mt-1">
                    <strong>Город:</strong> {animal.PetShelter.city}
                  </p>
                  <p className="mt-1">
                    <strong>Адрес:</strong> {animal.PetShelter.address}
                  </p>
                </div>
              ) : (
                <p className="mt-2">Информация о приюте недоступна.</p>
              )}
            </div>
            {/* Болезни */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Болезни</h2>
              {animal.Diseases && animal.Diseases.length > 0 ? (
                <ul className="list-disc list-inside mt-2">
                  {animal.Diseases.map((disease) => (
                    <li key={disease.Diseases.ID}>{disease.Diseases.Name}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2">Болезни отсутствуют.</p>
              )}
            </div>
          </div>

          {/* Формы для заявок на усыновление */}
          {store.user.role === "user" && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">Усыновление</h2>
              {request?.ID > 0 ? (
                <div>
                  <p>Ваш запрос в обработке</p>
                  <p>
                    <strong>Текст: </strong>
                    {request?.description ? request?.description : ""}
                  </p>
                </div>
              ) : (
                <CreateAdoptionRequestForm _animalId={Number(id)} />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">Животное не найдено.</div>
      )}
    </div>
  );
};
