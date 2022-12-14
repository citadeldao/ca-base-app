import { types } from '../actions/types';

const initialState = {
    openedTransaction: [],
    transactions: [],
    transactionsLoaded: false,
};
export default function TransactionsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_OPENED_TRANSACTION:
            return {
                ...state,
                openedTransaction: action.payload,
            };
        case types.SET_TRANSACTIONS_LIST:
            return {
                ...state,
                transactions: action.payload,
            };
        case types.SET_TRANSACTIONS_CLEAR:
            return {
                ...state,
                transactions: action.payload,
            };
        case types.SET_TRANSACTIONS_LOADED:
            return {
                ...state,
                transactionsLoaded: action.payload,
            };
        default:
            return state;
    }
}