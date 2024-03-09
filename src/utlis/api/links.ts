export const baseUrl = "http://crud";

export const login = `${baseUrl}/user/login`;
export const getAllPosts = `${baseUrl}/api/getAllPosts`;
export const postByID = (postID: number) => `${baseUrl}/node/${postID}`;
export const getTaxByID = `${baseUrl}/api/getTaxByID`;
export const createPost = `${baseUrl}/node/`;
export const getPostsByFilter = `${baseUrl}/api/getPostsByFilter/`;
export const searchPosts = `${baseUrl}/api/search/`;
