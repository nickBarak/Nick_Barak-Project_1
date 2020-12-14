import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    to : string;
}

const Redirect = ({ to = '/' }: Props) => {
    const history = useHistory();
    history.push(to);

    return <></>
}

export default Redirect
