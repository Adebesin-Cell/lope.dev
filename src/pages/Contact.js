import Contact from "../components/contact/Contact";
import { ContactWrapper } from "../styles/Contact.style";

const ContactPage = function () {
  return (
    <ContactWrapper active='contact' title='contact'>
      <Contact />
    </ContactWrapper>
  );
};

export default ContactPage;
