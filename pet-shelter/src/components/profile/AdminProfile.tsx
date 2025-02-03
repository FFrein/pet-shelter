import { useState } from "react";
import { observer } from "mobx-react-lite";
import PetShelterAuthService from "../../api/services/petShelterAuth.service";
import { toast } from "react-toastify";
import AuthService from "../../api/services/auth.service";

export const AdminProfile = observer(() => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userBan, setUserBan] = useState(false);
  const [shelterId, setShelterId] = useState<number | null>(null);
  const [shelterBan, setShelterBan] = useState(false);

  // Обработчик блокировки пользователя
  const handleBanUser = async () => {
    if (!userId) {
      toast.error("Введите корректный ID пользователя!");
      return;
    }

    try {
      const resp = await AuthService.ban(userId, userBan ? 1 : 0);

      if (resp?.data?.ID) {
        toast.success(
          `Пользователь ${userId} ${
            userBan ? "заблокирован" : "разблокирован"
          } успешно!`
        );
        setUserId(null);
        setUserBan(false);
      } else {
        throw new Error(resp?.message || "Неизвестная ошибка");
      }
    } catch (error: any) {
      toast.error(
        `Ошибка при блокировке пользователя: ${
          error.message || "Произошла ошибка"
        }`
      );
    }
  };

  // Обработчик блокировки приюта
  const handleBanShelter = async () => {
    if (!shelterId) {
      toast.error("Введите корректный ID приюта!");
      return;
    }

    try {
      const resp = await PetShelterAuthService.ban(
        shelterId,
        shelterBan ? 1 : 0
      );

      if (resp?.data.ID) {
        toast.success(
          `Приют ${shelterId} ${
            shelterBan ? "заблокирован" : "разблокирован"
          } успешно!`
        );
        setShelterId(null);
        setShelterBan(false);
      } else {
        throw new Error(resp?.message || "Неизвестная ошибка");
      }
    } catch (error: any) {
      toast.error(
        `Ошибка при блокировке приюта: ${error.message || "Произошла ошибка"}`
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
      <div className="flex flex-col gap-8">
        {/* Блокировка пользователя */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">
            Блокировка пользователя
          </h3>
          <div className="flex flex-col gap-4">
            <input
              placeholder="ID пользователя"
              type="number"
              value={userId || ""}
              onChange={(e) => setUserId(Number(e.target.value))}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={userBan}
                onChange={(e) => setUserBan(e.target.checked)}
                id="userBan"
                className="h-4 w-4"
              />
              <label htmlFor="userBan" className="text-sm">
                Заблокировать
              </label>
            </div>
            <button
              onClick={handleBanUser}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Подтвердить
            </button>
          </div>
        </div>

        {/* Блокировка приюта */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Блокировка приюта</h3>
          <div className="flex flex-col gap-4">
            <input
              placeholder="ID приюта"
              type="number"
              value={shelterId || ""}
              onChange={(e) => setShelterId(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={shelterBan}
                onChange={(e) => setShelterBan(e.target.checked)}
                id="shelterBan"
                className="h-4 w-4"
              />
              <label htmlFor="shelterBan" className="text-sm">
                Заблокировать
              </label>
            </div>
            <button
              onClick={handleBanShelter}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
