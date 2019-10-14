import { ROLE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case ROLE:
            return action.payload;
        default:
            return state;
    }
}
