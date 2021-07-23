import axios from "axios";

export const useAxios = (token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const authAxiosGet = async (url: string) => await axios.get(url, config);
  const authAxiosPost = async (url: string, data: any) =>
    await axios.post(url, data, config);
  const authAxiosPut = async (url: string, data: any) =>
    await axios.put(url, data, config);
  const authAxiosDelete = async (url: string) =>
    await axios.delete(url, config);

  return { authAxiosGet, authAxiosPost, authAxiosPut, authAxiosDelete };
};
