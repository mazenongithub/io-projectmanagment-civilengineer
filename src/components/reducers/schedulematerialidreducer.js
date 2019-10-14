import { SCHEDULEMATERIALID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case SCHEDULEMATERIALID:
            return action.payload;
        default:
            return state;
    }
}
