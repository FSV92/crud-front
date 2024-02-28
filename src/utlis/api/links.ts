export const baseUrl = "http://crud";

export const login = `${baseUrl}/user/login?_format=json`;
export const logout = (logoutToken: string) => `${baseUrl}/user/logout?_format=json&token=${logoutToken}`;
export const getAllPosts = `${baseUrl}/api/getAllPosts`;
export const getTaxByID = `${baseUrl}/api/getTaxByID`;
export const deletePost = (postID: number) => `${baseUrl}/node/${postID}?_format=json`;
