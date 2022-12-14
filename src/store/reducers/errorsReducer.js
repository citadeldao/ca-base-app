import { types } from '../actions/types';

const initialState = {
    errors: null,
    networkErrors: null,
    validationErrors: null,
    implementationErrors: null,
    argumentsError: null,
    openErrorModal: false,
};
export default function ErrorReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        case types.SET_ERROR_MODAL:
            return {
                ...state,
                openErrorModal: action.payload,
            };
        case types.SET_NETWORK_ERRORS:
            return {
                ...state,
                networkErrors: action.payload,
            };
        case types.SET_ARGUMENTS_ERRORS:
            return {
                ...state,
                argumentsError: action.payload,
            };
        case types.SET_VALIDATION_ERRORS:
            return {
                ...state,
                validationErrors: action.payload,
            };
        case types.SET_IMPLEMENTATION_ERRORS:
            return {
                ...state,
                implementationErrors: action.payload,
            };
        default:
            return state;
    }
}