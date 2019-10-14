import { TOTAL_HOURS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case TOTAL_HOURS:
            return action.payload;
        default:
            return state;
    }
}
