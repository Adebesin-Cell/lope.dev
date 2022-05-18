import { Link } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import { Contact, Work, Base } from "../../pages";

const MobileView = function () {
  return (
    <div className='base' title='base'>
      <Routes>
        <Route path='/' element={<Base />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/work' element={<Work />}></Route>
      </Routes>
    </div>
  );
};

export default MobileView;
