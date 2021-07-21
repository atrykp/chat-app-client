import NavBar from "../../components/NavBar/NavBar";
import profile from "../../images/profile.jpg";
import ListTemplate from "../../Template/ListTemplate/ListTemplate";

const contacts = [
  { username: "John", text: "hello im new", img: profile },
  { username: "John", text: "hello im new", img: profile },
  { username: "John", text: "hello im new", img: profile },
];

const ContactsScreen = () => {
  return (
    <>
      <NavBar />
      <ListTemplate listElements={contacts}></ListTemplate>
    </>
  );
};

export default ContactsScreen;
