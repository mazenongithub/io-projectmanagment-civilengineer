import { FIRST_NAME } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case FIRST_NAME:
            return action.payload;
        default:
            return state;
    }
}
