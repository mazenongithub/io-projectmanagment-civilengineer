import { ALLUSERS } from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case ALLUSERS:
            return action.payload;
        default:
            return state;
    }
}
