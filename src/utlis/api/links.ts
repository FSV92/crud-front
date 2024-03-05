export const baseUrl = "http://crud";

export const login = `${baseUrl}/user/login?_format=json`;
export const logout = (logoutToken: string) => `${baseUrl}/user/logout?_format=json&token=${logoutToken}`;
export const getAllPosts = `${baseUrl}/api/getAllPosts`;
export const postByID = (postID: number) => `${baseUrl}/node/${postID}?_format=json`;
export const getTaxByID = `${baseUrl}/api/getTaxByID`;
export const createPost = `${baseUrl}/node/?_format=json`;
export const getSearchedPosts = `${baseUrl}/api/getSearchedPosts/`;
