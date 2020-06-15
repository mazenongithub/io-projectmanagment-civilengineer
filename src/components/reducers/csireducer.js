import {CSIS} from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case CSIS:
            return action.payload;
        default:
            return state;
    }
}
