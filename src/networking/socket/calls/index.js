import { utils } from '@citadeldao/apps-sdk';

const sendCustomMessage = (params) => {
    const request = new utils.Request('post', process.env.REACT_APP_BACKEND_URL + `/customMsg?token=${params.token}`, {data: params.data})
    return request
}

export const socket = {
    sendCustomMessage
};
