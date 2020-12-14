import React, { ReactChildren, ReactChild } from 'react'

import Nav from './Nav';
import Footer from './Footer';

interface Props {
    children: ReactChildren | ReactChild;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Nav />
                {children}
            <Footer />
        </div>
    )
}

export default Layout
