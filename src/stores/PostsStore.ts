import {
  makeAutoObservable,
  observable,
  action,
  runInAction,
  // computed
} from "mobx";
import * as api from "../utlis/api/functions";

export type PostModelType = {
  id: number;
  title: string;
  body: string;
  dates: Array<{ value: string }>;
  image: string;
  type: {
    target_id: number;
    target_type: string;
    target_uuid: string;
    url: string;
  };
  tags: Array<{
    target_id: number;
    target_type: string;
    target_uuid: string;
    url: string;
  }>;
};

type ReceivedPostType = {
  nid: Array<{ value: number }>;
  title: Array<{ value: string }>;
  body: Array<{ value: string }>;
  field_klyuchevaya_data: Array<{ value: string }>;
  field_image: Array<{ url: string }>;
  field_tip_sobytiya: Array<PostModelType["type"]>;
  field_tags: PostModelType["tags"];
};

class PostModel {
  @observable id: PostModelType["id"];
  @observable title: PostModelType["title"];
  @observable body: PostModelType["body"];
  @observable dates: PostModelType["dates"];
  @observable image: PostModelType["image"];
  @observable type: PostModelType["type"];
  @observable tags: PostModelType["tags"];

  constructor(options: PostModelType) {
    makeAutoObservable(this);

    this.id = options.id;
    this.title = options.title;
    this.body = options.body;
    this.dates = options.dates;
    this.image = options.image;
    this.type = options.type;
    this.tags = options.tags;
  }
}

class PostsStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable posts: Array<PostModel>;

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
        image: post.field_image[0]?.url,
        type: post.field_tip_sobytiya[0],
        tags: post.field_tags,
      };

      return this.createPostObject(options);
    });
  };

  getAllPosts = async () => {
    const result = await api.getAllPosts();

    if (result.status === 200) {
      runInAction(() => {
        this.posts = this.createPostsSection(result.data);
      });
    }
  };

  getTaxByID = async (name: string, tid: number) => {
    const result = await api.getTaxByID(name, tid);
    if (result.status === 200) {
      return result.data;
    }
  };
}
export default new PostsStore();
