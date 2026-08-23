const API_URLS = {
  AUTH: {
    LOGIN: "/auth/login",
  },

  USERS: {
    GET_ALL: "/users",
    GET_BY_ID: (id) => `/users/${id}`,
  },

  PRODUCTS: {
    GET_ALL: "/products",
    GET_BY_ID: (id) => `/products/${id}`,
  },
};

export default API_URLS;