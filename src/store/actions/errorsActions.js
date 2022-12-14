import { types } from './types';
import text from '../../text.json';
import { ValidationError } from '../../networking/models/Errors';
import * as Sentry from '@sentry/react';

const errorList = [
    {
        error: 'Application doesn`t have permision to build transactions',
        description: 'Application doesn`t have permision to build transactions.',
    },
    {
        error: 'Your address have no transactions',
        description: 'There are no transactions associated with this address.',
    },
    {
        error: 'Unsupported protobuf type',
        description: 'This type is not supported by protobuf.',
    },
    {
        error: 'Connot get ABI',
        description: 'ABI is not found.',
    },
    {
        error: 'Cannot call contract method:',
        description: 'ABI doesn\'t contain the contract method.',
    },
    {
        error: 'Cannot get medium speed gasPrice from networkFees',
        description: 'Cannot get medium gas price from networkFees',
    },
    {
        error: 'Cannot get gasPrice',
        description: 'Gas price cannot be accessed',
    },
    {
        error: 'EstimateGas failed:',
        description: 'Cannot provide the gas estimation',
    },
    {
        error: 'Specified net is not supported!',
        description: 'Specified network is not yet supported',
    },
    {
        // eslint-disable-next-line
        error: `Specified net doesn\'t support transfer or not yet implemented.`,
        description: 'Specified network doesn\'t support transfer or not yet implemented.',
    },
    {
        error: `"to" is empty`,
        description: `Parameter "to" is empt`,
    },
    {
        // eslint-disable-next-line
        error: 'Incorrect \'to\' address',
        description: 'The destination address is incorrect ',
    },
    {
        error: `"amount" is empty`,
        description: `The "amount" is missing`,
    },
    {
        error: `"msgs" should be an array`,
        description: `The field format is incorrect. "msgs" should be an array.`,
    },
    {
        error: `"from" is empty`,
        description: `Incorrect data from the front`,
    },
    {
        error: `"toAddress" is empty`,
        description: `Incorrect data from the front`,
    },
    {
        error: `Wrong data format for "amount"`,
        description: `The "amount" parameter has wrong data format`,
    },
    {
        error: `Wrong data format for "gas"`,
        description: `The "gas" parameter has wrong data format`,
    },
    {
        error: `"toAddress" is empty`,
        description: `Incorrect data from the front`,
    },
    {
        error: `Incorrect recipient address`,
        description: `The recipient address is incorrect.`,
    },
    {
        error: `failed to execute message; message index: 0: Token not supported by`,
        description: `This token is not supported by the application.`,
    },
    {
        error: `is lesser than min amount: calculated amount is lesser than min amount: invalid request`,
        description: `Insufficient balance for transaction completion.`,
    },
    {
        error: `Transaction does not have denom`,
        description: `The transaction denom is missing.`,
    },
    {
        error: `Invalid auth token at isAuth`,
        description: `Auth token is invalid, try reloading the page.`,
    },
    {
        error: `Incorrect parameters for transaction`,
        description: `Incorrect parameters for transaction!`,
    },
    {
        error: `Insufficient funds`,
        description: `Insufficient balance`,
    },
    {
        error: `Connector service is temporary unavailable!`,
        description: `Connector service is temporary unavailable!`,
    },
    {
        error: 'operation is not available',
        description: 'This operation is unavailable',
    },
];

const clearErrors = () => dispatch => {
    dispatch({
        type: types.SET_ERROR_MODAL,
        payload: false,
    });
    dispatch({
        type: types.SET_ERRORS,
        payload: null,
    });
    dispatch({
        type: types.SET_NETWORK_ERRORS,
        payload: null,
    });
    dispatch({
        type: types.SET_VALIDATION_ERRORS,
        payload: null,
    });
};

const setCustomErrors = (error) => dispatch => {
    dispatch({
        type: types.SET_ERRORS,
        payload: error,
    });
};

const setConfirmModal = (error) => dispatch => {
    dispatch({
        type: types.SET_CONFIRM_MODAL,
        payload: error,
    });
};

const checkErrors = (error) => dispatch => {
    console.log(error, '--error');
    if (error instanceof ValidationError) {
        let errorText = {
            text: text.ADDRESS_ERROR_TEXT,
            tip: text.ADDRESS_ERROR_TIP,
            header: text.ADDRESS_ERROR_HEADER,
        };
        dispatch({
            type: types.SET_VALIDATION_ERRORS,
            payload: errorText,
        });
        dispatch({
            type: types.SET_ERROR_MODAL,
            payload: true,
        });
    } else if (error) {
        let errorText = 'Something went wrong.';
        for (let i = 0; i < errorList.length; i++) {
            if (error.message?.toLowerCase().includes(errorList[i].error.toLowerCase())) {
                errorText = errorList[i].description;
                break;
            }
        }
        dispatch(setCustomErrors({ text: errorText }));
        Sentry.captureException(error?.message || error);
    }
};

export const errorActions = {
    clearErrors,
    checkErrors,
    setCustomErrors,
    setConfirmModal,
};