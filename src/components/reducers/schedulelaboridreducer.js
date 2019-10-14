import { SCHEDULELABORID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case SCHEDULELABORID:
            return action.payload;
        default:
            return state;
    }
}
