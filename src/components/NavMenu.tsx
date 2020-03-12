import React, { FunctionComponent, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import UserLogin from './UserLogin';
import { AuthProps } from './AuthProvider';
import './NavMenu.css';

interface NavMenuProps extends AuthProps { }

const NavMenu: FunctionComponent<NavMenuProps> = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed)
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Search / Index Service</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem hidden={!props.authState.isAuthenticated}>
                                <NavLink tag={Link} className="text-dark" to="/reader">Reader</NavLink>
                            </NavItem>
                            <NavItem hidden={!props.authState.isAuthenticated}>
                                <NavLink tag={Link} className="text-dark" to="/token">Token</NavLink>
                            </NavItem>
                            <NavItem hidden={!props.authState.isAuthenticated}>
                                <NavLink tag={Link} className="text-dark" to="/searchindex">Search Index</NavLink>
                            </NavItem>
                            <NavItem hidden={!props.authState.isAuthenticated}>
                                <NavLink tag={Link} className="text-dark" to="/writer">Writer</NavLink>
                            </NavItem>
                            <NavItem hidden={!props.authState.isAuthenticated}>
                                <NavLink tag={Link} className="text-dark" to="/query">Query</NavLink>
                            </NavItem>
                            <UserLogin {...props} />
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavMenu;