import { makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

interface userConfig {
  login: string;
  password?: string;
  name: string;
  phone: string;
  email: string;
  accountType: "user" | "admin" | "coach";
}

export class MainStore {
  token: string | null = null;
  userConfig: userConfig | null = null;

  constructor() {
    axios.defaults.baseURL = "http://localhost:5000/api";

    makeObservable(this, {
      token: observable,
      userConfig: observable,
    });
  }
  setToken = (token: string) => {
    runInAction(() => {
      this.token = token;
    });
  };

  getToken = () => this.token;

  setUserConfig = (config: userConfig) => {
    runInAction(() => {
      this.userConfig = config;
    });
  };

  getUserConfig = () => this.userConfig;
}
