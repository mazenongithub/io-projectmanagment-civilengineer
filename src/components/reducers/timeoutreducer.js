import { TIMEOUT } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case TIMEOUT:
            return action.payload;
        default:
            return state;
    }
}
