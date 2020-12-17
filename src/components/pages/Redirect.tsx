import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    to : string;
}

const Redirect = ({ to = '/client' }: Props) => {
    const history = useHistory();
    useEffect(() => history.push(to));

    return <></>
}

export default Redirect
