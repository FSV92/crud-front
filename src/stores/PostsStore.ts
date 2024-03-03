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
import { convertingDateToISO, convertingBodyWithGaps } from "../utlis/utils";

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

  @observable posts: Array<PostModel> = [];
  @observable tags: Array<SelectType> = [];
  @observable selectedTags: Array<SelectType> = [];
  @observable selectedType: SelectType = null;
  @observable types: Array<SelectType> = [];
  @observable currentPost: ReceivedPostType = null;
  @observable loadingEditPost: boolean = false;

  // @observable tagsLib: Array<TaxType> = [];
  @observable tagsLib: Array<SelectType> = [];
  // @observable typesLib: Array<TaxType> = [];
  @observable typesLib: Array<SelectType> = [];
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

  // @action addTagToLib = (tag: TaxType) => {
  //   const existingTag = this.tagsLib.find((tagLib: TaxType) => tagLib.tid[0].value === tag.tid[0].value);

  //   if (!existingTag) {
  //     this.tagsLib.push(tag);
  //   }

  //   localStorage.setItem("tagsLib", JSON.stringify(this.tagsLib));
  // };

  // @action addTypeToLib = (type: TaxType) => {
  //   const existingType = this.typesLib.find((typeLib: TaxType) => typeLib.tid[0].value === type.tid[0].value);

  //   if (!existingType) {
  //     this.typesLib.push(type);
  //   }

  //   localStorage.setItem("typesLib", JSON.stringify(this.typesLib));
  // };

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

    // this.tags = [];
    this.selectedTags = [];
    this.selectedType = null;
  };

  @action setInputPostValue(name: string, value: string) {
    this.inputPostValues = { ...this.inputPostValues, [name]: { value } };
  }

  @action setDateValue = (date: string) => {
    this.inputPostValues.field_klyuchevaya_data.push({
      value: date,
    });
  };

  @action setDatesValues = (dates: EditPostType["field_klyuchevaya_data"]) => {
    this.inputPostValues.field_klyuchevaya_data = dates;
  };

  @action setTagsValues = (tags: Array<SelectType>) => {
    this.selectedTags = tags.map((tag) => tag);
    this.inputPostValues.field_tags = tags.map((tag) => {
      return {
        target_id: tag.id,
      };
    });
  };

  @action setTypeValue = (type: SelectType) => {
    this.selectedType = type;

    this.inputPostValues.field_tip_sobytiya = {
      target_id: type.id,
    };
  };

  @action createPostObject = (options: PostModelType) => {
    return new PostModel(options);
  };

  @action createPostsSection = (posts: []) => {
    return posts.map((post: ReceivedPostType | undefined) => {
      const options = {
        id: post.nid[0]?.value,
        title: post.title[0]?.value,
        body: convertingBodyWithGaps(post.body[0]?.value),
        dates: post.field_klyuchevaya_data,
        type: post.field_tip_sobytiya[0],
        tags: post.field_tags,
      };

      return this.createPostObject(options);
    });
  };

  // подходящий формат для селектов
  createSelectObj = (options: TaxType) => {
    return { id: options?.tid[0]?.value, value: options?.name[0]?.value, label: options?.name[0]?.value };
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

  // получить пост по ID
  @action getPostByID = async (postID: number) => {
    runInAction(() => (this.loadingEditPost = true));
    const result = await api.getPostByID(postID);

    if (result?.status === 200) {
      this.currentPost = result.data;

      // установка элементов поста
      this.setInputPostValue("title", result.data.title[0].value); //  заголовок
      this.setInputPostValue("body", result.data.body[0].value); // описание
      this.setDatesValues(result.data.field_klyuchevaya_data); // ключевые даты

      // теги
      if (result?.data?.field_tags?.length > 0) {
        this.tagsLib = JSON.parse(localStorage.getItem("tagsLib"));

        runInAction(() => (this.selectedTags = []));
        for (const tag of result.data.field_tags) {
          const currentTag = this.tagsLib.find((tagLib: SelectType) => tagLib?.id === tag.target_id);

          runInAction(() => this.selectedTags.push(currentTag));
        }
        this.setTagsValues(this.selectedTags);
      }

      // тип события
      if (result?.data?.field_tip_sobytiya?.length > 0) {
        this.typesLib = JSON.parse(localStorage.getItem("typesLib"));

        runInAction(() => (this.selectedType = null));
        const currentType = this.typesLib.find((typeLib: SelectType) => typeLib?.id === result?.data?.field_tip_sobytiya[0].target_id);

        runInAction(() => (this.selectedType = currentType));
        this.setTypeValue(currentType);
      }

      // ключевые даты
      if (result?.data?.field_klyuchevaya_data?.length > 0) {
        runInAction(
          () =>
            (this.inputPostValues.field_klyuchevaya_data = result.data.field_klyuchevaya_data.map((date: any) => {
              return { value: date.value.split("T")[0] };
            }))
        );
      }

      runInAction(() => (this.loadingEditPost = false));
    } else {
      runInAction(() => (this.loadingEditPost = false));
      alert(result.data.message);
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
    if (result?.status === 200) {
      if (name === "tags") {
        runInAction(() => (this.tags = result.data.map((tag: TaxType) => this.createSelectObj(tag))));
        localStorage.setItem("tagsLib", JSON.stringify(this.tags));
      }

      if (name === "tip") {
        runInAction(() => (this.types = result.data.map((type: TaxType) => this.createSelectObj(type))));
        localStorage.setItem("typesLib", JSON.stringify(this.types));
      }
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
    // преобразование полей

    // изменение форматы даты
    this.inputPostValues.field_klyuchevaya_data = this.inputPostValues.field_klyuchevaya_data.map((date) => {
      return { value: convertingDateToISO(date.value) };
    });

    const result = await api.createPost(this.inputPostValues, LoginStore.userData);
    console.log("result", result);

    if (result?.statusText === "Created") {
      openModal();
    } else {
      alert(result.data.message);
    }
  };

  // обновление поста
  updatePost = async (postID: number, openModal: () => void) => {
    this.inputPostValues.field_klyuchevaya_data = this.inputPostValues.field_klyuchevaya_data.map((date) => {
      return { value: convertingDateToISO(date.value) };
    });

    const result = await api.updatePost(postID, this.inputPostValues, LoginStore.userData);
    console.log("result", result);

    if (result?.status === 200) {
      openModal();
    } else {
      alert(result.data.message);
    }
  };
}
export default new PostsStore();
