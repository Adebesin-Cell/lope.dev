import { Routes, Route } from "react-router-dom";
import { Contact, Work, Base, Resume } from "../../pages";
import { MobileViewWrapper } from "./MobileHome.style";
import Header from "../header/Header";

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
    </MobileViewWrapper>
  );
};

export default MobileView;
