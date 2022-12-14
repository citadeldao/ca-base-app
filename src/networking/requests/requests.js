import { transactions } from './transactions';
import { wallet } from './wallet';
import { auth } from './auth';
import { user } from './user';
import { socket } from '../socket/calls';

export const requests = {
    transactions,
    wallet,
    auth,
    socket,
    user,
};