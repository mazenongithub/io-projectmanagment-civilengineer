import { LAST_NAME } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case LAST_NAME:
            return action.payload;
        default:
            return state;
    }
}
