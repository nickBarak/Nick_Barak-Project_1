import React, { ReactChildren, ReactChild } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../types';
import updateUser from '../../store/actions/updateUser.action';
import { LOGOUT } from '../../store/types';
import API from '../../resources';

import Nav from './Nav';
import Footer from './Footer';

interface Props {
    children: ReactChildren | ReactChild;
}

const Layout = ({ children }: Props) => {
    const user = useSelector(({user} : { user: User }) => user);
    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = async () => {
        let response = await fetch(API + '/logout');
        if (response.ok) {
            dispatch( updateUser(LOGOUT, null) );
            history.push('/client');
        }
    }

    return (
        <div>
            {!user
                ?
                <span className="header-login">
                    <button><Link to='/client/signup'>Sign up</Link></button>
                    <button><Link to='/client/login'>Log in</Link></button>
                </span>
                : <button className="header-logout" onClick={logOut}>Log out</button>
            }
            <Nav />
                {children}
            <Footer />
        </div>
    )
}

export default Layout
