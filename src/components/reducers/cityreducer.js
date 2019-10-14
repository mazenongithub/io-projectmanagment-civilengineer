import { CITY } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case CITY:
            return action.payload;
        default:
            return state;
    }
}
