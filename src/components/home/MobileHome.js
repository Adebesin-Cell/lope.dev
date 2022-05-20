import { Routes, Route } from "react-router-dom";
import { Contact, Work, Base, Resume } from "../../pages";
import { MobileViewWrapper } from "./MobileHome.style";
import Header from "../header/Header";
import Socials from "../socials/Socials";

const MobileView = function (props) {
  return (
    <MobileViewWrapper theme={props.theme} title='app'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Base theme={props.theme} />}></Route>
        <Route
          path='/contact'
          element={<Contact theme={props.theme} />}
        ></Route>
        <Route path='/resume' element={<Resume theme={props.theme} />}></Route>
        <Route path='/work' element={<Work theme={props.theme} />}></Route>
      </Routes>
      <Socials></Socials>
    </MobileViewWrapper>
  );
};

export default MobileView;
