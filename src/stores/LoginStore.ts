import { makeAutoObservable, observable, action, runInAction, computed } from "mobx";
import * as api from "../utlis/api/functions";

export type EnteredValuesType = {
  name: string;
  pass: string;
};

export type UserDataType = {
  csrf_token: string;
  current_user: { uid: string; roles: Array<string>; name: string };
  logout_token: string;
  pass: string;
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

    console.log("checkSetAuth", this.userData);
  };

  @action
  login = async (values: EnteredValuesType) => {
    try {
      const result = await api.login(values);
      this.userData = result.data;
      this.userData.pass = values.pass;
      this.isAuth = true;
      localStorage.setItem("userData", JSON.stringify(this.userData));
    } catch (error) {
      console.log(error);

      // alert(error);
    }
    // if (result.status === 200) {
    //   this.userData = result.data;
    //   this.userData.pass = values.pass;
    //   this.isAuth = true;
    //   localStorage.setItem("userData", JSON.stringify(this.userData));

    //   console.log("login", this.userData);
    // }
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
