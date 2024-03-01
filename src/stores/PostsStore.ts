import {
  makeAutoObservable,
  observable,
  action,
  runInAction,
  // computed
} from "mobx";
import * as api from "../utlis/api/functions";
import LoginStore from "./LoginStore";

import { PostModelType, ReceivedPostType, TaxType, SelectType, EditPostType } from "../types/PostsTypes";

class PostModel {
  @observable id: PostModelType["id"];
  @observable title: PostModelType["title"];
  @observable body: PostModelType["body"];
  @observable dates: PostModelType["dates"];
  @observable type: PostModelType["type"];
  @observable tags: PostModelType["tags"];

  constructor(options: PostModelType) {
    makeAutoObservable(this);

    this.id = options.id;
    this.title = options.title;
    this.body = options.body;
    this.dates = options.dates;
    this.type = options.type;
    this.tags = options.tags;
  }
}

class PostsStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable posts: Array<PostModel>;
  @observable tags: Array<SelectType>;
  @observable types: Array<SelectType>;
  // @observable postValues: PostModelType = {}

  @observable inputPostValues: EditPostType = {
    title: { value: "" },
    body: { value: "" },
    field_klyuchevaya_data: [],
    type: [
      {
        target_id: "article",
      },
    ],
    field_tip_sobytiya: null,
    field_tags: [],
  };

  @action resetInputPostValues = () => {
    this.inputPostValues.title.value = "";
    this.inputPostValues.body.value = "";
    this.inputPostValues.field_klyuchevaya_data = [];
    this.inputPostValues.type = [
      {
        target_id: "article",
      },
    ];
    this.inputPostValues.field_tip_sobytiya = null;
    this.inputPostValues.field_tags = [];
  };

  @action setInputPostValue(name: string, value: string) {
    this.inputPostValues = { ...this.inputPostValues, [name]: { value } };
  }

  @action setDateValue = (date: string) => {
    //  const formattedDate = date.toISOString();
    this.inputPostValues.field_klyuchevaya_data.push({
      value: date,
    });
  };

  @action setTagsValues = (tags: Array<SelectType>) => {
    this.inputPostValues.field_tags = tags.map((tag) => {
      return {
        target_id: tag.id,
      };
    });
  };

  @action setTypeValue = (type: SelectType) => {
    this.inputPostValues.field_tip_sobytiya = {
      target_id: type.id,
    };
  };

  @action createPostObject = (options: PostModelType) => {
    return new PostModel(options);
  };

  @action createPostsSection = (posts: []) => {
    return posts.map((post: ReceivedPostType | undefined) => {
      // console.log(post.field_tip_sobytiya);

      const options = {
        id: post.nid[0]?.value,
        title: post.title[0]?.value,
        body: post.body[0]?.value,
        dates: post.field_klyuchevaya_data,
        type: post.field_tip_sobytiya[0],
        tags: post.field_tags,
      };

      return this.createPostObject(options);
    });
  };

  @action createSelectObj = (options: TaxType) => {
    return { id: options.tid[0].value, value: options.name[0].value, label: options.name[0].value };
  };

  // апи запросы
  // получить все запросы
  getAllPosts = async () => {
    const result = await api.getAllPosts();

    if (result?.status === 200) {
      runInAction(() => {
        this.posts = this.createPostsSection(result.data);
      });
    }
  };

  // получить таксономию по ID
  getTaxByID = async (name: string, tid: number) => {
    const result = await api.getTaxByID(name, tid);
    if (result?.status === 200) {
      return result.data;
    }
  };

  // получить все элементы таксономий
  getAllItemsTax = async (name: string) => {
    const result = await api.getTaxByID(name);
    // console.log(name, result);
    if (result?.status === 200) {
      name === "tags" && runInAction(() => (this.tags = result.data.map((tag: TaxType) => this.createSelectObj(tag))));
      name === "tip" && runInAction(() => (this.types = result.data.map((type: TaxType) => this.createSelectObj(type))));
    }
  };

  // удаление поста
  deletePost = async (postID: number) => {
    const result = await api.deletePost(postID, LoginStore.userData);

    if (result?.status === 204) {
      const foundIndex = this.posts.findIndex((post) => post.id === postID);
      if (foundIndex !== -1) {
        runInAction(() => this.posts.splice(foundIndex, 1));
      }
    }
  };

  // создание поста
  createPost = async (openModal: () => void) => {
    const result = await api.createPost(this.inputPostValues, LoginStore.userData);
    console.log("result", result);

    if (result?.statusText === "Created") {
      this.resetInputPostValues();
      openModal();
    } else {
      alert(result.data.message);
    }
  };
}
export default new PostsStore();
