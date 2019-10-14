import { UNIT_COST } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case UNIT_COST:
            return action.payload;
        default:
            return state;
    }
}
