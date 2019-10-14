import { UNIT } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case UNIT:
            return action.payload;
        default:
            return state;
    }
}
