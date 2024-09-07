import { useState } from "react";
import { Link } from "react-router-dom";

//import style here
import "../assets/stylesheet/notfound.css";

const NotFound = ({ setTogglePokedex }) => {


  return (
    <div className="container">
      <div className="unknow-container">
        Well, what you are looking for is TOP-SECRET, QUIT or DIE
      </div>
      <Link to="/">
        <button id="goback" onClick={setTogglePokedex(false)}>
          QUIT
        </button>
      </Link>
    </div>
  );
};
export default NotFound;
