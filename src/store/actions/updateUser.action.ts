// import { SIGNUP, LOGIN, LOGOUT } from '../types';
import { User } from '../../types';

const updateUser = (type : string, payload : User | null) => ({ type, payload });

export default updateUser;