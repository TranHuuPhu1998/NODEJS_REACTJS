import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Modal,
  ModalHeader,
} from "../../components";

const RTLNavbar = ({ handleLogout }) => {
  return (
    <>
      <Navbar
        className={classNames("navbar-absolute border-bottom border-primary")}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <NavLink to="/">
              <h2 className="mb-0 text-primary">LEANING BY QA</h2>
            </NavLink>
          </div>
          <Collapse navbar>
            <Nav className="ml-auto align-items-center" navbar>
              <NavLink to="/courses">Courses</NavLink>
              <NavLink className="ml-4" to="/chat">
                Chat
              </NavLink>
              <InputGroup className="search-bar">
                <Button color="link">
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-sound-wave" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink to="li">
                    <DropdownItem className="nav-item">
                      Another one
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <img src={user.at(0)?.avatar} className='photo'/> */}
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink to="/profile">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink to="">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink to="/" onClick={handleLogout}>
                    <DropdownItem className="nav-item">Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Modal modalClassName="modal-search">
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button aria-label="Close" className="close">
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
};

export default RTLNavbar;
