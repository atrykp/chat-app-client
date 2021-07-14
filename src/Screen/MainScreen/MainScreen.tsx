import "./MainScreen.scss";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";
import profile from "../../images/profile.jpg";
import NavBar from "../../components/NavBar/NavBar";

const contacts = [
  { header: "John", text: "hello im new", img: profile },
  { header: "John", text: "hello im new", img: profile },
  { header: "John", text: "hello im new", img: profile },
];

const MainScreen = () => {
  return (
    <>
      <NavBar />
      <ListTemplate listElements={contacts}></ListTemplate>
    </>
  );
};

export default MainScreen;
