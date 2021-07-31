import { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../hooks/redux-hooks";

import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";

import { useAxios } from "../../hooks/useAxios";
import { useLogout } from "../../hooks/useLogout";

import { IListElement } from "../../components/ListElement/ListElement";

const ConversationScreen = () => {
  const userInfo = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useQuery(
    "getConversations",
    () => getConversations(),
    { retry: 2, staleTime: 1000 }
  );
  const { authAxiosGet } = useAxios(userInfo.token);
  const logout = useLogout();

  const getConversations = useCallback(async () => {
    const { data } = await authAxiosGet("http://localhost:5000/conversations");

    const configList: IListElement[] = await Promise.all(
      data.map(async (element: any) => {
        const [user] = element.members.filter((elem: string) => {
          return elem !== userInfo._id;
        });

        const { data } = await authAxiosGet(
          `http://localhost:5000/user/${user}`
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
  }, [userInfo._id, authAxiosGet]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  return (
    <div>
      <NavBar />
      {isLoading && <h1 style={{ position: "absolute" }}>loading</h1>}
      {isError && <h1 style={{ position: "absolute" }}>error</h1>}
      <ListTemplate listElements={data!} path="chat" />
    </div>
  );
};

export default ConversationScreen;
