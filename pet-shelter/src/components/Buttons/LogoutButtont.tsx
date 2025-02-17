import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../main";

const LogoutButton = observer(() => {
  const { store } = useContext(Context);
  const handleLogout = async () => {
    try {
      await store.logout();
      await store.logoutPS();
      console.log("Выход выполнен успешно");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
});

export default LogoutButton;
