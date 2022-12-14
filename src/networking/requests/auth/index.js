import { utils } from '@citadeldao/apps-sdk';

const getAccessToken = () => {
    return new utils.Request(
        'get',
        `${process.env.REACT_APP_BACKEND_URL}/get-access-token`,
    );
};

export const auth = {
    getAccessToken,
};