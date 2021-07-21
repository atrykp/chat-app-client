import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useQuery } from "react-query";
import axios from "axios";
import { useCallback } from "react";
import { IListElement } from "../../components/ListElement/ListElement";

const ConversationScreen = () => {
  const userInfo = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useQuery("getConversations", () =>
    getConversations(userInfo.token)
  );

  const getConversations = useCallback(
    async (token: string) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/conversations",
        config
      );

      const configList: IListElement[] = await Promise.all(
        data.map(async (element: any) => {
          const [user] = element.members.filter(
            (elem: string) => elem !== userInfo._id
          );
          const { data } = await axios.get(
            `http://localhost:5000/user/${user}`,
            config
          );

          const userObj = {
            username: data.user.username,
            text: data.user.description,
            img: data.user.profilePicture,
            key: data.user.username,
            _id: data.user._id,
          };
          console.log(userObj);

          return userObj;
        })
      );

      return configList;
    },
    [userInfo._id]
  );

  return (
    <div>
      <NavBar />
      {isLoading && <h1 style={{ position: "absolute" }}>loading</h1>}
      {isError && <h1 style={{ position: "absolute" }}>error</h1>}

      <ListTemplate listElements={data!} />
    </div>
  );
};

export default ConversationScreen;
