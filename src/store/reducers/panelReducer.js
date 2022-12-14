import { types } from '../actions/types'
const qs = require('querystring');
const params = window.location.search.slice(1);
const paramsAsObject = qs.parse(params);

const initialState = {
    previousPanel: '/',
    bottomInset: paramsAsObject.bottomInset,
    borderRadius: paramsAsObject.borderRadius
};
export default function PanelReducer(state=initialState,action){
    switch (action.type){
        case types.SET_PREVIOUS_PANEL:
            return {
                ...state,
                previousPanel: action.payload
            }
        default:
            return state
    }
}