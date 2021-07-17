import profile from "../../images/profile.jpg";
import NavBar from "../../components/NavBar/NavBar";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import { useAppSelector } from "../../hooks/redux-hooks";

const conversations = [
  { header: "Mark", text: "nice", img: profile },
  { header: "Bill", text: "lorem ipsum", img: profile },
  { header: "Elon", text: "ye ", img: profile },
  { header: "Mark", text: "nice", img: profile },
  {
    header: "Bill",
    text: "lorem ipsum lorem ",
    img: profile,
  },
  { header: "Elon", text: "ye ", img: profile },
  { header: "Mark", text: "nice", img: profile },
  { header: "Bill", text: "lorem ipsum", img: profile },
  { header: "Elon", text: "ye ", img: profile },
];

const ConversationScreen = () => {
  const user = useAppSelector((state) => state.user);
  console.log(user);

  return (
    <div>
      <NavBar />
      <ListTemplate listElements={conversations}></ListTemplate>
    </div>
  );
};

export default ConversationScreen;
