import Helmet from "react-helmet";
import Contact from "../components/contact/Contact";
import { ContactWrapper } from "../styles/Contact.style";

const ContactPage = () => (
	<ContactWrapper active="contact" title="contact">
		<Helmet>
			<title> Contact | Lope - Adebesin Tolulope </title>
		</Helmet>
		<Contact />
	</ContactWrapper>
);

export default ContactPage;
