import { Action } from '../../types';
import { SIGNUP, LOGIN, LOGOUT } from '../types';

const user = (state=null, { type, payload } : Action) => {
    switch (type) {
        case SIGNUP:
            return payload;
        case LOGIN:
            return payload;
        case LOGOUT:
            return payload;
        default:
            return state;
    }
}

export default user;