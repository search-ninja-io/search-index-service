import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { AuthProps } from './AuthProvider';

interface LayoutProps extends AuthProps { }

export class Layout extends Component<LayoutProps> {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu {...this.props} />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
