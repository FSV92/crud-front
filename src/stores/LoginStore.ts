import { makeAutoObservable, observable, action, runInAction, computed } from "mobx";
import * as api from "../utlis/api/functions";

export type EnteredValuesType = {
  name: string;
  pass: string;
};

type UserDataType = {
  csrf_token: string;
  current_user: { uid: string; roles: Array<string>; name: string };
  logout_token: string;
};

class LoginStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable enteredValues: EnteredValuesType = { name: "", pass: "" }; // данные формы для отправки
  @observable userData: UserDataType = null;
  @observable isAuth: boolean = false;

  @action setEnteredValue = (key: string, val: string) => {
    this.enteredValues = { ...this.enteredValues, [key]: (val += val) };
  };

  @action
  checkSetAuth = () => {
    if (!this.userData && localStorage.userData) {
      const localUserData = localStorage.getItem("userData");
      this.userData = JSON.parse(localUserData);
      this.isAuth = true;
    }
  };

  @action
  login = async (values: EnteredValuesType) => {
    const result = await api.login(values);

    console.log("result", result);

    if (result.csrf_token.length) {
      this.userData = result;
      this.isAuth = true;
      localStorage.setItem("userData", JSON.stringify(result));
    }
  };

  @action
  logout = async () => {
    const { csrf_token, logout_token } = this.userData;
    const result = await api.logout(csrf_token, logout_token);

    console.log("result", result);

    // if (result.csrf_token.length) {
    //   this.userData = result;
    //   this.isAuth = true;
    // }
  };
}

export default new LoginStore();
