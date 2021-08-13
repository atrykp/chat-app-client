import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../hooks/redux-hooks";

import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";

import { useLogout } from "../../hooks/useLogout";

import { useGetConversations } from "../../hooks/useGetConversations";
import Loader from "../../components/Loader/Loader";
import InfoBar from "../../components/InfoBar";

const ConversationScreen = () => {
  const userInfo = useAppSelector((state) => state.user);

  const { getConversations } = useGetConversations(
    userInfo.token,
    userInfo._id
  );
  const { isLoading, isError, data } = useQuery(
    "getConversations",
    () => getConversations(),
    { retry: 1, staleTime: 1000 }
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
      {isLoading && <Loader />}
      {isError && <InfoBar text={"Something went wrong"} isOpen />}
      <ListTemplate listElements={data!} path="chat" padding />
    </div>
  );
};

export default ConversationScreen;
