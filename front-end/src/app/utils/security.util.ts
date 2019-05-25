import { User } from "../models/user.model";

const PETSHOP_USER = "petshop.user";
const PETSHOP_TOKEN = "petshop.token";

export class Secutiry {
  public static set(user: User, token: string) {
    const data = JSON.stringify(user);

    localStorage.setItem(PETSHOP_USER, btoa(data));
    localStorage.setItem(PETSHOP_TOKEN, token);
  }

  public static setUser(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem(PETSHOP_USER, btoa(data));
  }

  public static setToken(token: string) {
    localStorage.setItem(PETSHOP_TOKEN, token);
  }

  public static getUser(): User {
    const data = localStorage.getItem(PETSHOP_USER);
    return data ? JSON.parse(atob(data)) : null;
  }

  public static getToken(): string {
    const data = localStorage.getItem(PETSHOP_TOKEN);
    return data ? data : null;
  }

  public static hasToken(): boolean {
    return this.getToken !== null;
  }

  public static clean() {
    localStorage.removeItem(PETSHOP_TOKEN);
    localStorage.removeItem(PETSHOP_USER);
  }
 }
