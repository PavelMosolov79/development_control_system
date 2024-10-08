import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async login(email: string, password: string) {
        try {
          const response = await AuthService.login(email, password);

          localStorage.setItem('token', response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.userDto);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async registration(email: string, password: string, name: string, surname: string, middlename: string) {
        try {
            const response = await AuthService.registration(email, password, name, surname, middlename);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
        } catch (err: any) {
            return err.response?.status;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();

            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async chekAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}