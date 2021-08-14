import axios from "axios";
import { useCallback, useRef } from "react";

export const useAxios = (token: string) => {
  const configRef = useRef({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const authAxiosGet = useCallback(
    async (url: string) => await axios.get(url, configRef.current),
    []
  );
  const authAxiosPost = async (url: string, data: any) =>
    await axios.post(url, data, configRef.current);
  const authAxiosPut = async (url: string, data: any) =>
    await axios.put(url, data, configRef.current);
  const authAxiosDelete = async (url: string) =>
    await axios.delete(url, configRef.current);

  return { authAxiosGet, authAxiosPost, authAxiosPut, authAxiosDelete };
};
