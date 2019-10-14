import {SCOPEOFWORK } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case SCOPEOFWORK:
            return action.payload;
        default:
            return state;
    }
}
