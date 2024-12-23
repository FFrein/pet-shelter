import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { TokenService } from "./token.service.js";
import { ApiError } from "../exceptions/api.error.js";
export class UserService {
  static async registration(username, email, password, phonenumber) {
    const candidate = await UserModel.getByEmail(email);
    if (candidate) {
      throw "User exist";
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      phonenumber,
      role: "user",
    });

    const userDto = {
      username: user.UserName,
      email: user.Email,
      phonenumber: user.PhoneNumber,
      role: user.Role,
    };

    const tokens = TokenService.generateTokens({ ...userDto });

    return { ...tokens, user: userDto };
  }

  static async login(email, password) {
    const user = await UserModel.getByEmail(email);
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.Password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = {
      username: user.UserName,
      email: user.Email,
      phonenumber: user.PhoneNumber,
      role: user.Role,
    };
    const tokens = TokenService.generateTokens({ ...userDto });

    return { ...tokens, user: userDto };
  }

  static async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
