import { Routes, Route } from "react-router-dom";
import { Contact, Work, Base, Resume } from "../../pages";
import { MobileViewWrapper } from "./MobileHome.style";
import Header from "../header/Header";
import Socials from "../socials/Socials";

const MobileView = function () {
  return (
    <MobileViewWrapper title='base'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Base />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/resume' element={<Resume />}></Route>
        <Route path='/work' element={<Work />}></Route>
      </Routes>
      <Socials></Socials>
    </MobileViewWrapper>
  );
};

export default MobileView;
