import { IListElement } from "../components/ListElement/ListElement";
import { useAxios } from "./useAxios";

export const useGetConversations = (token: string, userId: string) => {
  const { authAxiosGet } = useAxios(token);
  const getConversations = async () => {
    const { data } = await authAxiosGet(
      `${
        process.env.REACT_APP_SERVER
          ? process.env.REACT_APP_SERVER
          : "http://localhost:5000"
      }/conversations`
    );

    const configList: IListElement[] = await Promise.all(
      data.map(async (element: any) => {
        const [user] = element.members.filter((elem: string) => {
          return elem !== userId;
        });

        const { data } = await authAxiosGet(
          `${
            process.env.REACT_APP_SERVER
              ? process.env.REACT_APP_SERVER
              : "http://localhost:5000"
          }/user/${user}`
        );

        const userObj: IListElement = {
          username: data.user.username,
          text: data.user.description,
          img: data.user.profilePicture,
          _id: data.user._id,
          conversationId: element._id,
        };

        return userObj;
      })
    );

    return configList;
  };
  return { getConversations };
};
