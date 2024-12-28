import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class PetShelterAuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("petshelters/login", { email, password })
      .then((response) => response);
  }

  static async registration(
    name: string,
    address: string,
    email: string,
    password: string,
    description: string
  ): Promise<any> {
    return $api
      .post<any>("petshelters/", {
        email,
        password,
        name,
        address,
        description,
      })
      .then((response) => response)
      .catch((response) => response);
  }

  static async logout(): Promise<void> {
    $api.post<any>("petshelters/logout");
  }
}
