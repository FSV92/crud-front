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

  @computed get isAdmin() {
    return this.userData?.current_user?.roles?.length > 0 && this.userData?.current_user?.roles[1] === "administrator";
  }

  @action setEnteredValue = (key: string, val: string) => {
    this.enteredValues = { ...this.enteredValues, [key]: (val += val) };
  };

  @action
  checkSetAuth = () => {
    if (!this.userData && sessionStorage.userData) {
      const localUserData = sessionStorage.getItem("userData");
      this.userData = JSON.parse(localUserData);
      this.isAuth = true;
    }

    console.log("checkSetAuth", this.isAuth);
  };

  @action
  login = async (values: EnteredValuesType) => {
    // try {
    const result = await api.login(values);

    if (result.status === 200) {
      runInAction(() => {
        this.userData = result.data;
        this.userData.pass = values.pass;
        this.isAuth = true;
      });

      sessionStorage.setItem("userData", JSON.stringify(this.userData));
    } else {
      alert(result.data.message);
    }
  };

  @action
  logout = async () => {
    runInAction(() => {
      this.userData = null;
      sessionStorage.removeItem("userData");
      this.isAuth = false;
    });
  };
}

export default new LoginStore();
