import profile from "../../images/profile.jpg";
import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useQuery } from "react-query";
import axios from "axios";
import { useCallback } from "react";

const ConversationScreen = () => {
  const userInfo = useAppSelector((state) => state.user);
  const { isLoading, isError, data, error } = useQuery("getConversations", () =>
    getConversations(userInfo.token)
  );

  const getConversations = useCallback(async (token: string) => {
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
    return data;
  }, []);

  return (
    <div>
      <NavBar />
      {isLoading && <h1 style={{ position: "absolute" }}>loading</h1>}
      {isError && <h1 style={{ position: "absolute" }}>error</h1>}

      <ListTemplate listElements={[]}></ListTemplate>
    </div>
  );
};

export default ConversationScreen;
