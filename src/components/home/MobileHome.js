import { Route, Routes } from "react-router-dom";
import { Base, Contact, NotFound, Resume, Work } from "../../pages";
import Header from "../header/Header";
import Socials from "../socials/Socials";
import { MobileViewWrapper } from "./MobileHome.style";

const MobileView = (props) => {
	return (
		<MobileViewWrapper theme={props.theme} title="App">
			<Header />
			<Routes>
				<Route path="/" element={<Base theme={props.theme} />} />
				<Route path="/contact" element={<Contact theme={props.theme} />} />
				<Route path="/resume" element={<Resume theme={props.theme} />} />
				<Route path="/work" element={<Work theme={props.theme} />} />
				<Route path="*" element={<Base theme={props.theme} />} />
				<Route path="*" element={<NotFound theme={props.theme} />} />
			</Routes>
			<Socials />
		</MobileViewWrapper>
	);
};

export default MobileView;
