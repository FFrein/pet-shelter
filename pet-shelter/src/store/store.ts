import { makeAutoObservable } from "mobx";
import AuthService from "../api/services/auth.service";
import IUserContext from "../consts/models";
import $api from "../api/http/http";
import PetShelterAuthService from "../api/services/petShelterAuth.service";

export default class Store {
  user = {} as IUserContext;
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUserContext) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  /*
  async update(data: any) {
    try {
      const resp = await UserService.changeProfile(data);
      if (resp.data.access_token) {
        localStorage.setItem("access_token", resp.data.access_token);
        this.setUser(resp.data.user);
      }
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
    */

  async login(email: string, password: string) {
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("accessToken", resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(
    username: string,
    email: string,
    password: string,
    phonenumber: string
  ) {
    try {
      const resp = await AuthService.registration(
        email,
        password,
        username,
        phonenumber
      );
      if (resp.status !== 200 && resp.status !== 201) {
        console.log(resp);
        throw new Error(resp.response.data.error || "Registration failed");
      }
      localStorage.setItem("accessToken", resp.data.accessToken);

      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUserContext);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const resp = await $api.get<any>(`user/refresh`, {
        withCredentials: true,
      });

      if (resp.data.accessToken) {
        localStorage.setItem("accessToken", resp.data.accessToken);
        this.setAuth(true);
        this.setUser(resp.data.user);
      } else {
        this.setAuth(false);
      }
    } catch (e: any) {
      //console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async loginPS(email: string, password: string) {
    try {
      const resp = await PetShelterAuthService.login(email, password);
      localStorage.setItem("accessToken", resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.petShelter);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registrationPS(
    email: string,
    password: string,
    name: string,
    address: string,
    description: string,
    city: string,
    country: string
  ) {
    try {
      const resp = await PetShelterAuthService.registration(
        email,
        password,
        name,
        address,
        description,
        city,
        country
      );
      if (resp.status !== 200 && resp.status !== 201) {
        console.log(resp);
        throw new Error(resp.response.data.error || "Registration failed");
      }
      localStorage.setItem("accessToken", resp.data.accessToken);

      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  async logoutPS() {
    this.setLoading(true);
    try {
      await PetShelterAuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUserContext);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuthPS() {
    this.setLoading(true);
    try {
      const resp = await $api.get<any>(`petshelters/refresh`, {
        withCredentials: true,
      });

      if (resp.data.accessToken) {
        localStorage.setItem("accessToken", resp.data.accessToken);
        this.setAuth(true);
        this.setUser(resp.data.user);
      } else {
        this.setAuth(false);
      }
    } catch (e: any) {
      //console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
