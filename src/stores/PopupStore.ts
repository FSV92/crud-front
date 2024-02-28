import {
  makeAutoObservable,
  observable,
  action,
  runInAction,
  // computed
} from "mobx";

class PopupStore {
  @observable isVisible: boolean = false;

  @action setVisibility = (val: boolean) => {
    this.isVisible = val;
  };
}

export default new PopupStore();
