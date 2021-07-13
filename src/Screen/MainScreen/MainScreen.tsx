import { IListTemplate } from "../../Template/ListTemplate/ListTemplate";
import "./MainScreen.scss";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import profile from "../../images/profile.jpg";

const contacts = [
  { header: "John", text: "hello im new", img: profile },
  { header: "John", text: "hello im new", img: profile },
  { header: "John", text: "hello im new", img: profile },
];

const MainScreen = () => {
  return (
    <>
      <h1>Hello in chatApp</h1>
      <ListTemplate listElements={contacts}></ListTemplate>
    </>
  );
};

export default MainScreen;
