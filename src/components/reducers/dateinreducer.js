import { DATEIN } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case DATEIN:
            return action.payload;
        default:
            return state;
    }
}
