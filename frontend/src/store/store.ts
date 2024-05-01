import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
          const response = await AuthService.login(email, password);
          console.log(response);
          console.log(response.data.userDto)

          localStorage.setItem('token', response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.userDto);
          console.log(this)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            console.log(response.data.userDto)

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
            console.log(this)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);

            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async chekAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }
}