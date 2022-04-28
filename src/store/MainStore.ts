import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";

interface userConfig {
  _id: string;
  login: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  accountType: "user" | "admin" | "coach";
}

export class MainStore {
  token: string | null = null;
  userConfig: userConfig = {
    _id: "",
    login: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    accountType: "user",
  };
  abonements: any[] = [];

  constructor() {
    axios.defaults.baseURL = "http://localhost:5000/api";

    makeObservable(this, {
      token: observable,
      userConfig: observable,
      abonements: observable,
      clearConfig: action,
      setToken: action,
      setUserConfig: action,
    });
  }

  clearConfig = () => {
    runInAction(() => {
      this.token = null;
      this.userConfig = {
        _id: "",
        login: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        accountType: "user",
      };
      this.abonements = [];
    });
  };

  setToken = (token: string) => {
    runInAction(() => {
      this.token = token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });
  };

  getToken = () => this.token;

  setUserConfig = (config: userConfig) => {
    runInAction(() => {
      this.userConfig = config;
    });
  };

  getUserConfig = () => this.userConfig;

  setAbonements = (newAbonements: []) => {
    runInAction(() => {
      this.abonements = newAbonements;
    });
  };

  getAbonements = () => this.abonements;
}
