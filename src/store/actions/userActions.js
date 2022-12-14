import { types } from './types';
import { store } from '../store';
import { getRequest } from '../../networking/requests/getRequest';
import { utils } from '@citadeldao/apps-sdk';

const requestManager = new utils.RequestManager();
const userRequest = getRequest('user');

const setAuthToken = (token) => ({
    type: types.SET_OPENED_TRANSACTION,
    payload: token,
});

const loadSocketToken = () => (dispatch) => {
    try {
        requestManager.send(userRequest.getSocketToken()).then((res) => {
            dispatch({
                type: types.SET_SOCKET_TOKEN,
                payload: res.data?.data,
            });
        });
    } catch {}
};

const loadUserConfig = async () => {
    const { auth_token } = store.getState().user;
    try {
        let result = await requestManager.send(userRequest.getUserConfig(auth_token));
        console.log(result, '-loadUserConfig');
        store.dispatch({
            type: types.SET_USER_CONFIG,
            payload: result.data && JSON.parse(result.data),
        });
        return result.data && JSON.parse(result.data);
    } catch {
        return null;
    }
};

const setUserConfig = (config = null) => {
    const { auth_token } = store.getState().user;
    const data = { data: { config } };

    try {
        requestManager.send(userRequest.setUserConfig(auth_token, data));
    } catch {}
};

export const usersActions = {
    setAuthToken,
    loadSocketToken,
    loadUserConfig,
    setUserConfig,
};