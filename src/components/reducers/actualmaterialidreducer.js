import { ACTUALMATERIALID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case ACTUALMATERIALID:
            return action.payload;
        default:
            return state;
    }
}
