import * as links from "./links";
import axios from "axios";
import { EnteredValuesType, UserDataType } from "../../stores/LoginStore";

export const login = async ({ name, pass }: EnteredValuesType) => {
  const response = await axios
    .post(links.login, { name, pass })
    .then((res) => res)
    .catch((error) => {
      console.log(error.response.data);

      return error.response.data;
    });

  return response;
};

export const logout = async (csrf_token: string, logoutToken: string) => {
  // console.log(csrf_token);

  const response = await axios
    .post(links.logout(logoutToken), {}, { headers: { "X-CSRF-Token": csrf_token } })
    .then((res) => res)
    .catch((error) => {
      return error.response.data;
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

export const getTaxByID = async (name: string, tid: number) => {
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
    .delete(links.deletePost(postID), {
      headers: {
        // "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json",
        // credentials: "include",
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

// export const editPost = async (postID: number) => {
//   const response = await axios
//     .put(links.getTaxByID, {
//       params: {
//         name,
//         tid,
//       },
//       headers: {
//         "X-CSRF-Token": "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       return error.response;
//     });

//   return response;
// };
