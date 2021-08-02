import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../hooks/redux-hooks";

import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";

import { useLogout } from "../../hooks/useLogout";

import { useGetConversations } from "../../hooks/useGetConversations";

const ConversationScreen = () => {
  const userInfo = useAppSelector((state) => state.user);
  const { getConversations } = useGetConversations(
    userInfo.token,
    userInfo._id
  );
  const { isLoading, isError, data } = useQuery(
    "getConversations",
    () => getConversations(),
    { retry: 2, staleTime: 1000 }
  );
  const logout = useLogout();

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
      <ListTemplate listElements={data!} path="chat" padding />
    </div>
  );
};

export default ConversationScreen;
