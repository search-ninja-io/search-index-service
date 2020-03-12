import React, { FunctionComponent } from 'react';
import { NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { AuthProps } from './AuthProvider';

interface UserLoginProps extends AuthProps { }

const UserLogin: FunctionComponent<UserLoginProps> = (props) => {
    if (props.authState.isAuthenticated && props.authState.user) {
        return (
            <UncontrolledDropdown>
                <DropdownToggle nav caret>{props.authState.user.name}</DropdownToggle>
                <DropdownMenu right>
                    <h5 className="dropdown-item-text mb-0">{props.authState.user.name}</h5>
                    <p className="dropdown-item-text text-muted mb-0">{props.authState.user.login}</p>
                    <DropdownItem divider />
                    <DropdownItem onClick={props.onSignOut}>Sign Out</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
    else {
        return (<NavItem>
            <NavLink onClick={props.onSignIn} href='#'>Sign in</NavLink>
        </NavItem>);
    }
}

export default UserLogin;