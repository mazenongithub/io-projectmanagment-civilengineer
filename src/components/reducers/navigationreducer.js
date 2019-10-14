import { NAVIGATION } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case NAVIGATION:
            return action.payload;
        default:
            return state;
    }
}
