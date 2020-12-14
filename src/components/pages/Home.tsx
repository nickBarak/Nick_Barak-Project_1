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
            <div className="PAGE-HOME">
                <h3>Welcome to RRDex!</h3>
                <br />
                {user
                    ? <div>What will you learn about pokemon today, {user.username}?</div>
                    : <div>Log in or sign up to view the site!</div>
                }
            </div>
        </Layout>
    )
}

export default Home;
