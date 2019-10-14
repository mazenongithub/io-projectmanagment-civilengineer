import { TIMEIN } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case TIMEIN:
            return action.payload;
        default:
            return state;
    }
}
