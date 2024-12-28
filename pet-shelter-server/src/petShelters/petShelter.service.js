import bcrypt from "bcrypt";
import PetShelterModel from "../models/petShelter.model.js";
import { TokenService } from "../authorization/token.service.js";
import { PetShelterDto } from "../database/dtos/dto.js";
export default class PetShelterService {
  // Получить все приюты
  static async getAll() {
    return await PetShelterModel.getAll();
  }

  // Создать новый приют с хэшированием пароля
  static async create(petShelter) {
    const hashedPassword = await bcrypt.hash(petShelter.password, 10); // Хэшируем пароль
    return await PetShelterModel.create({
      ...petShelter,
      password: hashedPassword, // Сохраняем хэшированный пароль
    });
  }

  // Авторизация приюта
  static async authenticate(email, password) {
    const petShelter = await PetShelterModel.getByEmail(email);
    if (!petShelter) {
      throw new Error("Приют с таким email не найден");
    }

    const isPasswordValid = await bcrypt.compare(password, petShelter.Password);
    if (!isPasswordValid) {
      throw new Error("Неверный пароль");
    }

    const shelterDto = PetShelterDto(petShelter);

    const tokens = TokenService.generateTokens(shelterDto);

    return { ...tokens, petShelter: shelterDto };
  }

  // Логаут
  static async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  // Обновить информацию о приюте
  static async update(id, data) {
    return await PetShelterModel.update(id, data);
  }
}
