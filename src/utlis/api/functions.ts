import * as links from "./links";
import axios from "axios";

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
