import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout';
import { User } from '../../types';

interface Props {
    
}

const Home = (props: Props) => {
    const user = useSelector(({ user } : { user : User }) => user);

    return (
        <Layout>
            <div className="PAGE-HOME body">
                <h1>Welcome to RRDex!</h1>
                {user
                    ? <div>What will you learn about pokemon today, <strong>{user.username}</strong>?</div>
                    : <div>Log in or sign up to view the site!</div>
                }
            </div>
        </Layout>
    )
}

export default Home;
