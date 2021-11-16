import React from "react";
import { Navbar } from "react-bootstrap";

function Navi() {
  return (
    <Navbar className="justify-content-center shadow" variant="light" bg="light">
        <Navbar.Brand className="fw-bold" href="/">Games4Free</Navbar.Brand>
    </Navbar>
  );
}

export default Navi;
