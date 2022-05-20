import Form from "../Form/Form";
import NavButton from "../navButtons/NavButton";
import { ContactBody } from "./Contact.style";

const Contact = function () {
  return (
    <ContactBody>
      <Form></Form>
      <NavButton
        prev={{ url: "/resume", text: "Resume" }}
        next={{ url: "/", text: "Home" }}
      />
    </ContactBody>
  );
};

export default Contact;
