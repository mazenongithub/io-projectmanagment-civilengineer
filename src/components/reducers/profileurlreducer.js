import { PROFILEURL } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROFILEURL:
            return action.payload;
        default:
            return state;
    }
}
