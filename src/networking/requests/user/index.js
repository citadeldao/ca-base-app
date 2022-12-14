import { utils } from '@citadeldao/apps-sdk';

const getUserConfig = (token) => {
    return new utils.Request(
        'get',
        `${process.env.REACT_APP_BACKEND_URL}/configs`,
        {
            params: {
                token,
            },
        },
    );
};

const setUserConfig = (token, config) => {
    return new utils.Request(
        'put',
        `${process.env.REACT_APP_BACKEND_URL}/configs`,
        {
            ...config,
            params: {
                ...config.params,
                token,
            },
        });
};

const getSocketToken = () => {
    return new utils.Request(
        'get',
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/socket`,
    );
};

export const user = {
    getUserConfig,
    setUserConfig,
    getSocketToken,
};