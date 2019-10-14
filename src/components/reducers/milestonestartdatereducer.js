import { MILESTONESTARTDATE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case MILESTONESTARTDATE:
            return action.payload;
        default:
            return state;
    }
}
