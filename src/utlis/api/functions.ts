import * as links from "./links";
import axios from "axios";
import { EnteredValuesType, UserDataType } from "../../stores/LoginStore";
import { EditPostType, FilterValsType } from "../../types/PostsTypes";

export const login = async ({ name, pass }: EnteredValuesType) => {
  const response = await axios
    .post(
      links.login,
      { name, pass },
      {
        params: {
          _format: "json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const getAllPosts = async () => {
  const response = await axios
    .get(links.getAllPosts, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const getPostsByFilter = async (filterValues: FilterValsType) => {
  const response = await axios
    .get(links.getPostsByFilter, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        tip_tid: filterValues.tip_tid,
        tag_tid: filterValues.tag_tid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const searchPosts = async (query: string) => {
  const response = await axios
    .get(links.searchPosts, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        _format: "json",
        query,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const getPostByID = async (postID: number) => {
  const response = await axios
    .get(links.postByID(postID), {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        _format: "json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const getTaxByID = async (name: string, tid?: number) => {
  const response = await axios
    .get(links.getTaxByID, {
      params: {
        name,
        tid,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const deletePost = async (postID: number, userData: UserDataType) => {
  const response = await axios
    .delete(links.postByID(postID), {
      headers: {
        // "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json",
      },
      auth: {
        username: userData.current_user.name,
        password: userData.pass,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const createPost = async (values: EditPostType, userData: UserDataType) => {
  const response = await axios
    .post(
      links.createPost,
      {
        ...values,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: userData.current_user.name,
          password: userData.pass,
        },
        params: {
          _format: "json",
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

  return response;
};

export const updatePost = async (postByID: number, values: EditPostType, userData: UserDataType) => {
  const response = await axios
    .patch(
      links.postByID(postByID),
      {
        ...values,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: userData.current_user.name,
          password: userData.pass,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

  return response;
};
