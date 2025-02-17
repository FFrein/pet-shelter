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
    email: string,
    password: string,
    name: string,
    address: string,
    description: string,
    city: string,
    country: string
  ): Promise<any> {
    return $api
      .post<any>("petshelters/", {
        email,
        password,
        name,
        address,
        description,
        city,
        country,
      })
      .then((response) => response)
      .catch((response) => response);
  }

  static async logout(): Promise<void> {
    $api.post<any>("petshelters/logout");
  }

  static async ban(id: number, ban: number): Promise<any> {
    return $api
      .put<any>("petshelters/ban", { id, ban })
      .then((response) => response)
      .catch((response) => response);
  }
}
