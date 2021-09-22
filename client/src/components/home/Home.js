import React from "react";

function Home() {
  return (
    <div>
      <h1>THIS IS HOME PAGE</h1>
      {console.log(typeof localStorage.getItem("isAdmin"))}
    </div>
  );
}

export default Home;
