import * as links from "./links";
import axios from "axios";
import { EnteredValuesType } from "../../stores/LoginStore";

export const login = async ({ name, pass }: EnteredValuesType) => {
  const response = await axios
    .post(links.login, { name, pass })
    .then((res) => res.data)
    .catch((error) => {
      return error.response.data;
    });

  return response;
};

export const logout = async (csrf_token: string, logoutToken: string) => {
  console.log(csrf_token);

  const response = await axios
    .post(links.logout(logoutToken), {}, { headers: { "X-CSRF-Token": csrf_token } })
    .then((res) => res.data)
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
