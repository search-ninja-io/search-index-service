import React, { Component } from 'react';
import { NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { AuthProps } from './AuthProvider';

interface UserLoginProps extends AuthProps { }

class UserLogin extends Component<UserLoginProps> {
    static displayName = UserLogin.name;
    render() {
        if (this.props.auth.isAuthenticated && this.props.auth.user) {
            return (
                <UncontrolledDropdown>
                    <DropdownToggle nav caret>{this.props.auth.user.name}</DropdownToggle>
                    <DropdownMenu right>
                        <h5 className="dropdown-item-text mb-0">{this.props.auth.user.name}</h5>
                        <p className="dropdown-item-text text-muted mb-0">{this.props.auth.user.login}</p>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.props.onSignOut}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }
        else {
            return (<NavItem>
                <NavLink onClick={this.props.onSignIn} href='#'>Sign in</NavLink>
            </NavItem>);
        }
    }
}

export default UserLogin;