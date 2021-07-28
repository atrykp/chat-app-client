import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useQuery } from "react-query";
import { useCallback, useEffect } from "react";
import { IListElement } from "../../components/ListElement/ListElement";
import { useAxios } from "../../hooks/useAxios";
import { useHistory } from "react-router";
import { removeUser } from "../../store/slices/userSlice";

const ConversationScreen = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userInfo = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useQuery("getConversations", () =>
    getConversations()
  );
  const { authAxiosGet } = useAxios(userInfo.token);

  const getConversations = useCallback(async () => {
    const { data } = await authAxiosGet("http://localhost:5000/conversations");

    const configList: IListElement[] = await Promise.all(
      data.map(async (element: any) => {
        const [user] = element.members.filter((elem: string) => {
          console.log(elem);

          return elem !== userInfo._id;
        });

        const { data } = await authAxiosGet(
          `http://localhost:5000/user/${user}`
        );

        const userObj = {
          username: data.user.username,
          text: data.user.description,
          img: data.user.profilePicture,
          key: data.user.username,
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
      dispatch(removeUser());
      history.push("./login");
    }
  }, [isError, dispatch, history]);

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
