import React from "react";
import NavMain from "../shared/Nav";
import ServerList from "../shared/ServerList";

function Server() {
  return (
    <>
      <NavMain />
      <div style={{ display: "flex", height: "calc(100vh - 50px)" }}>
        <ServerList />
        {/* Server content */}
      </div>
    </>
  );
}

export default Server;
