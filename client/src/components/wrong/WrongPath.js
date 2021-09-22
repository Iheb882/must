import React from "react";
import { Link } from "react-router-dom";
function WrongPath() {
  return (
    <div>
      <h1>WRONG PATH</h1>
      <p>
        Please go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default WrongPath;
