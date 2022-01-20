import React from "react";
import { Nav } from "react-bootstrap";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import authStore from "../stores/authStore";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react";

function Navbar() {
  return (
    <Nav className="justify-content-end" bg="light" expand="lg">
      <li class="nav-item">
        Hello {authStore.user ? authStore.user.username : ""}
      </li>

      {authStore.user ? (
        <li class="nav-item">
          <Button onClick={authStore.logout}>Logout</Button>
        </li>
      ) : (
        <>
          <SignUpModal />
          <SignInModal />
        </>
      )}
    </Nav>
  );
}

export default observer(Navbar);
