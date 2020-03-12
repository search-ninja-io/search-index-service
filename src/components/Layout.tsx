import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';

import NavMenu from './NavMenu';
import { AuthProps } from './AuthProvider';

interface LayoutProps extends AuthProps { }

const Layout: FunctionComponent<LayoutProps> = (props) => {
    return (
        <div>
            <NavMenu {...props} />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;