import { types } from '../actions/types';
const qs = require('querystring');
const params = window.location.search.slice(1);
const paramsAsObject = qs.parse(params);

const initialState = {
    auth_token: paramsAsObject?.token,
    socket_token: null,
    user_configs: 'null',
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_SOCKET_TOKEN:
            return {
                ...state,
                socket_token: action.payload,
            };
        case types.SET_USER_CONFIG:
            return {
                ...state,
                user_configs: action.payload,
            };
        default:
            return state;
    }
}
