import { OCCUPATION } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case OCCUPATION:
            return action.payload;
        default:
            return state;
    }
}
