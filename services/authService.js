import apiClient from "./apiClient";
import API_URLS from "./apiUrls";


const login = async (payload) => {
  const response = await apiClient.post(
    API_URLS.AUTH.LOGIN,
    payload
  );

  return response.data;
};

const authService = {
  login,
};

export default authService;