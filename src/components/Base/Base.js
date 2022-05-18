import { Link } from "react-router-dom";
const Base = function () {
  return (
    <div className=''>
      <Link to='/work' style={{ color: "white" }}>
        Work
      </Link>
    </div>
  );
};

export default Base;
